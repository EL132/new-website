const test = require('node:test');
const assert = require('node:assert/strict');
const {
    createComment,
    getPostBySlug,
    listComments,
    listPosts,
} = require('./blogRepository');
const sanitizePostHtml = require('./sanitizePostHtml');

test('serves the checked-in blog index when the database URL is empty', async () => {
    const posts = await listPosts();

    assert.equal(posts.length, 4);
    assert.equal(posts[0].slug, 'k12-showcase-lessons-from-teachers-and-administrators');
    assert.equal('contentHtml' in posts[0], false);
});

test('serves sanitized checked-in article content when the database URL is empty', async () => {
    const post = await getPostBySlug('college-student-loneliness');

    assert.match(post.contentHtml, /<h2>W-curve<\/h2>/);
    assert.match(post.contentHtml, /src="\/assets\/education\/w-curve.png"/);
});

test('does not keep executable markup or remote images in article HTML', () => {
    const sanitized = sanitizePostHtml(
        '<p>Hello<script>alert(1)</script></p><img src="https://example.com/image.png">'
    );

    assert.equal(sanitized, '<p>Hello</p>');
});

test('keeps comments read-only until Supabase is configured', async () => {
    assert.deepEqual(await listComments('college-student-loneliness'), []);
    await assert.rejects(
        createComment('college-student-loneliness', 'Reader', 'Thoughtful post!'),
        error => error.statusCode === 503
    );
});
