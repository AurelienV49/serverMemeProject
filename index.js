const http = require('http');
const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const index = http.createServer(app);


index.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log("\x1b[32m", `✔   Server is running on port ${PORT}   ✔`);
    }
});

module.exports.PORT = PORT;