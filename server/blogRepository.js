const localPosts = require('./data/blog-posts.json');
const { requireDatabase, sql } = require('./db');
const sanitizePostHtml = require('./sanitizePostHtml');

function mapLocalPost(post, includeContent = false) {
    const mapped = {
        slug: post.slug,
        type: post.type,
        date: post.date,
        publishedAt: post.publishedAt,
        title: post.title,
        previewImage: post.previewImage,
        previewAlt: post.previewAlt,
        sourceLabel: post.sourceLabel,
        sourceUrl: post.sourceUrl,
        sourceDestination: post.sourceDestination,
    };

    if (includeContent) {
        mapped.contentHtml = sanitizePostHtml(post.contentHtml);
    }

    return mapped;
}

function mapDatabasePost(post, includeContent = false) {
    const mapped = {
        slug: post.slug,
        type: post.media_type,
        date: post.date_label,
        publishedAt: post.published_at,
        title: post.title,
        previewImage: post.preview_image,
        previewAlt: post.preview_alt,
        sourceLabel: post.source_label,
        sourceUrl: post.source_url,
        sourceDestination: post.source_destination,
    };

    if (includeContent) {
        mapped.contentHtml = sanitizePostHtml(post.content_html);
    }

    return mapped;
}

async function listPosts() {
    if (!sql) {
        return localPosts.map(post => mapLocalPost(post));
    }

    const rows = await sql`
        select
            slug,
            media_type,
            date_label,
            published_at,
            title,
            preview_image,
            preview_alt,
            source_label,
            source_url,
            source_destination
        from public.blog_posts
        where is_published = true
        order by published_at desc, id desc
    `;

    return rows.map(post => mapDatabasePost(post));
}

async function getPostBySlug(slug) {
    if (!sql) {
        const post = localPosts.find(entry => entry.slug === slug);
        return post ? mapLocalPost(post, true) : null;
    }

    const rows = await sql`
        select
            slug,
            media_type,
            date_label,
            published_at,
            title,
            preview_image,
            preview_alt,
            source_label,
            source_url,
            source_destination,
            content_html
        from public.blog_posts
        where slug = ${slug} and is_published = true
        limit 1
    `;

    return rows[0] ? mapDatabasePost(rows[0], true) : null;
}

async function listComments(slug) {
    if (!sql) {
        return [];
    }

    return sql`
        select
            comments.id,
            comments.name,
            comments.body,
            comments.created_at as "createdAt"
        from public.blog_comments as comments
        inner join public.blog_posts as posts on posts.id = comments.post_id
        where
            posts.slug = ${slug}
            and posts.is_published = true
            and comments.is_visible = true
        order by comments.created_at desc
    `;
}

async function createComment(slug, name, body) {
    const database = requireDatabase();
    const rows = await database`
        insert into public.blog_comments (post_id, name, body)
        select id, ${name}, ${body}
        from public.blog_posts
        where slug = ${slug} and is_published = true
        returning id, name, body, created_at as "createdAt"
    `;

    return rows[0] || null;
}

module.exports = {
    createComment,
    getPostBySlug,
    listComments,
    listPosts,
};
