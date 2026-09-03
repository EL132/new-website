const postgres = require('postgres');

const connectionString = process.env.SUPABASE_DATABASE_URL?.trim();

const sql = connectionString
    ? postgres(connectionString, {
        max: 5,
        idle_timeout: 20,
        connect_timeout: 10,
        prepare: false,
        ssl: 'require',
    })
    : null;

function requireDatabase() {
    if (!sql) {
        const error = new Error('The database connection has not been configured yet.');
        error.statusCode = 503;
        throw error;
    }

    return sql;
}

module.exports = {
    isDatabaseConfigured: Boolean(sql),
    requireDatabase,
    sql,
};
