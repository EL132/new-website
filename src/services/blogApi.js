async function requestJson(path, options = {}) {
    const response = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(payload.error || 'Unable to reach the blog service.');
    }

    return payload;
}

export async function getBlogComments(slug) {
    const payload = await requestJson(`/api/posts/${encodeURIComponent(slug)}/comments`);
    return payload.comments || [];
}

export async function publishBlogComment(slug, comment) {
    const payload = await requestJson(`/api/posts/${encodeURIComponent(slug)}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
    });
    return payload.comment;
}
