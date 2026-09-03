const test = require('node:test');
const assert = require('node:assert/strict');
const {
    createComment,
    isKnownPostSlug,
    listComments,
} = require('./blogRepository');

test('accepts comments only for posts that exist in the repository', () => {
    assert.equal(isKnownPostSlug('college-student-loneliness'), true);
    assert.equal(isKnownPostSlug('not-a-real-post'), false);
});

test('keeps comments read-only until Supabase is configured', async () => {
    assert.deepEqual(await listComments('college-student-loneliness'), []);
    await assert.rejects(
        createComment('college-student-loneliness', 'Reader', 'Thoughtful post!'),
        error => error.statusCode === 503
    );
});
