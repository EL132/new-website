const app = require('../server/index');

function handler(request, response) {
    const requestUrl = new URL(request.url, 'http://localhost');
    const forwardedPath = requestUrl.searchParams.get('path');

    if (forwardedPath) {
        requestUrl.searchParams.delete('path');
        const search = requestUrl.searchParams.toString();
        request.url = `/api/${forwardedPath}${search ? `?${search}` : ''}`;
    }

    return app(request, response);
}

module.exports = handler;
