require('dotenv').config({ quiet: true });

const posts = require('../server/data/blog-posts.json');
const { requireDatabase } = require('../server/db');
const sanitizePostHtml = require('../server/sanitizePostHtml');

async function seedBlogPosts() {
    const sql = requireDatabase();

    try {
        await sql.begin(async transaction => {
            for (const post of posts) {
                await transaction`
                insert into public.blog_posts (
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
                ) values (
                    ${post.slug},
                    ${post.type},
                    ${post.date},
                    ${post.publishedAt},
                    ${post.title},
                    ${post.previewImage},
                    ${post.previewAlt},
                    ${post.sourceLabel},
                    ${post.sourceUrl},
                    ${post.sourceDestination},
                    ${sanitizePostHtml(post.contentHtml)}
                )
                on conflict (slug) do update set
                    media_type = excluded.media_type,
                    date_label = excluded.date_label,
                    published_at = excluded.published_at,
                    title = excluded.title,
                    preview_image = excluded.preview_image,
                    preview_alt = excluded.preview_alt,
                    source_label = excluded.source_label,
                    source_url = excluded.source_url,
                    source_destination = excluded.source_destination,
                    content_html = excluded.content_html,
                    updated_at = now()
                `;
            }
        });

        console.log(`Seeded ${posts.length} blog posts.`);
    } finally {
        await sql.end({ timeout: 5 });
    }
}

seedBlogPosts().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
