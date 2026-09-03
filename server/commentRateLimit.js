const WINDOW_MS = 15 * 60 * 1000;
const MAX_COMMENTS_PER_WINDOW = 5;
const attemptsByAddress = new Map();

function commentRateLimit(request, response, next) {
    const now = Date.now();
    const address = request.ip || request.socket.remoteAddress || 'unknown';
    const recentAttempts = (attemptsByAddress.get(address) || [])
        .filter(timestamp => now - timestamp < WINDOW_MS);

    if (recentAttempts.length >= MAX_COMMENTS_PER_WINDOW) {
        response.status(429).json({
            error: 'Please wait a little before publishing another comment.',
        });
        return;
    }

    recentAttempts.push(now);
    attemptsByAddress.set(address, recentAttempts);

    if (attemptsByAddress.size > 10000) {
        for (const [key, timestamps] of attemptsByAddress.entries()) {
            if (!timestamps.some(timestamp => now - timestamp < WINDOW_MS)) {
                attemptsByAddress.delete(key);
            }
        }
    }

    next();
}

module.exports = commentRateLimit;
