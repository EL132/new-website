require('dotenv').config({ quiet: true });

const fs = require('fs');
const path = require('path');
const { requireDatabase } = require('../server/db');

async function migrateDatabase() {
    const sql = requireDatabase();
    const migrationDirectory = path.join(process.cwd(), 'supabase', 'migrations');
    const migrationFiles = fs.readdirSync(migrationDirectory)
        .filter(fileName => fileName.endsWith('.sql'))
        .sort();

    try {
        for (const migrationFile of migrationFiles) {
            await sql.file(path.join(migrationDirectory, migrationFile));
        }

        console.log('Supabase comments schema is ready.');
    } finally {
        await sql.end({ timeout: 5 });
    }
}

migrateDatabase().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
