require('dotenv').config({ quiet: true });

const fs = require('fs');
const path = require('path');
const app = require('./app');

const port = Number(process.env.PORT) || 3001;
const buildDirectory = path.join(__dirname, '..', 'build');

if (fs.existsSync(buildDirectory)) {
    app.use(express.static(buildDirectory));

    app.use((request, response, next) => {
        if (
            request.method === 'GET'
            && request.accepts('html')
            && !path.extname(request.path)
        ) {
            response.sendFile(path.join(buildDirectory, 'index.html'));
            return;
        }

        next();
    });
}

if (require.main === module) {
    const server = app.listen(port, () => {
        console.log(`Website and API listening on port ${port}`);
    });

    server.on('error', error => {
        console.error(error);
        process.exitCode = 1;
    });
}

module.exports = app;
