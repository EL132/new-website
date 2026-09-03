require('dotenv').config({ quiet: true });

const express = require('express');
const {
    createComment,
    listComments,
} = require('./blogRepository');
const { isDatabaseConfigured, sql } = require('./db');
const commentRateLimit = require('./commentRateLimit');

const app = express();
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use((request, response, next) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

app.use(express.json({ limit: '12kb', strict: true }));

app.get('/api/health', async (request, response) => {
    try {
        if (sql) {
            await sql`select 1`;
        }

        response.json({
            ok: true,
            databaseConfigured: isDatabaseConfigured,
            databaseConnected: Boolean(sql),
        });
    } catch (error) {
        response.status(503).json({
            ok: false,
            databaseConfigured: true,
            databaseConnected: false,
        });
    }
});

app.get('/api/posts/:slug/comments', async (request, response, next) => {
    try {
        const { slug } = request.params;

        if (!slugPattern.test(slug)) {
            response.status(400).json({ error: 'Invalid post slug.' });
            return;
        }

        response.setHeader('Cache-Control', 'no-store');
        response.json({ comments: await listComments(slug) });
    } catch (error) {
        next(error);
    }
});

app.post('/api/posts/:slug/comments', commentRateLimit, async (request, response, next) => {
    try {
        const { slug } = request.params;
        const rawName = typeof request.body?.name === 'string' ? request.body.name : '';
        const rawBody = typeof request.body?.body === 'string' ? request.body.body : '';
        const honeypot = typeof request.body?.website === 'string' ? request.body.website : '';
        const name = rawName.trim().replace(/\s+/g, ' ');
        const body = rawBody.replace(/\r\n/g, '\n').trim();

        if (!slugPattern.test(slug)) {
            response.status(400).json({ error: 'Invalid post slug.' });
            return;
        }

        if (honeypot) {
            response.status(400).json({ error: 'Unable to publish this comment.' });
            return;
        }

        if (!name || name.length > 80) {
            response.status(400).json({ error: 'Please enter a name of 80 characters or fewer.' });
            return;
        }

        if (!body || body.length > 2000) {
            response.status(400).json({ error: 'Please enter a comment of 2,000 characters or fewer.' });
            return;
        }

        const comment = await createComment(slug, name, body);

        if (!comment) {
            response.status(404).json({ error: 'Post not found.' });
            return;
        }

        response.status(201).json({ comment });
    } catch (error) {
        next(error);
    }
});

app.use('/api', (request, response) => {
    response.status(404).json({ error: 'API route not found.' });
});

app.use((error, request, response, next) => {
    if (response.headersSent) {
        next(error);
        return;
    }

    const statusCode = error.statusCode || error.status || 500;

    if (statusCode === 500) {
        console.error(error);
    }

    response.status(statusCode).json({
        error: error.type === 'entity.parse.failed'
            ? 'Invalid JSON request.'
            : statusCode === 500
                ? 'Something went wrong.'
                : error.message,
    });
});

module.exports = app;
