export function trackUmamiEvent(eventName, eventData) {
    if (
        typeof window === 'undefined'
        || typeof window.umami?.track !== 'function'
    ) {
        return;
    }

    window.umami.track(eventName, eventData);
}
