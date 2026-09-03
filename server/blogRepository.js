const localPosts = require('./data/blog-posts.json');
const { requireDatabase, sql } = require('./db');
const knownPostSlugs = new Set(localPosts.map(post => post.slug));

function isKnownPostSlug(slug) {
    return knownPostSlugs.has(slug);
}

async function listComments(slug) {
    if (!sql || !isKnownPostSlug(slug)) {
        return [];
    }

    return sql`
        select
            comments.id,
            comments.name,
            comments.body,
            comments.created_at as "createdAt"
        from public.blog_comments as comments
        where
            comments.post_slug = ${slug}
            and comments.is_visible = true
        order by comments.created_at desc
    `;
}

async function createComment(slug, name, body) {
    if (!isKnownPostSlug(slug)) {
        return null;
    }

    const database = requireDatabase();
    const rows = await database`
        insert into public.blog_comments (post_slug, name, body)
        values (${slug}, ${name}, ${body})
        returning id, name, body, created_at as "createdAt"
    `;

    return rows[0] || null;
}

module.exports = {
    createComment,
    isKnownPostSlug,
    listComments,
};
