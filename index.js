const http = require('http');
const app = require('./app');
require('dotenv').config();

const index = http.createServer(app);


index.listen(process.env.PORT || 3001, () => {
    // "\x1b[33m%s\x1b[0m"
    console.log("\x1b[32m", `✔   Server is running on port ${PORT}   ✔`);
});


// PORT=3000 DB_ID=Aurelien49 DB_PW=Auto012022 npm start Aurelien49 Auto012022