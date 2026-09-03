require('dotenv').config({ quiet: true });

const path = require('path');
const { requireDatabase } = require('../server/db');

async function migrateDatabase() {
    const sql = requireDatabase();
    const migrationPath = path.join(
        process.cwd(),
        'supabase',
        'migrations',
        '202609030001_blog_posts_and_comments.sql'
    );

    try {
        await sql.file(migrationPath);
        console.log('Supabase blog schema is ready.');
    } finally {
        await sql.end({ timeout: 5 });
    }
}

migrateDatabase().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
