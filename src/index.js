const http = require('http');
const app = require('./src/app');
const connection = require("./src/db");
require('dotenv').config();
const PORT = process.env.PORT || 9001;

const server = http.createServer(app);

// Connection à la base de données puis démarrage du serveur
connection()
    .then((_) => {
        server.listen(PORT, () => {
            if (process.env.NODE_ENV !== 'production') {
                console.log("\x1b[32m", `✔   2) Success start server on port ${PORT}      ✔`);
            }
        });
    }).catch((error) => {
    console.log()
});

module.exports.PORT = PORT;

/// TODO: NODE_ENV=_production DB_ID=Aurelien49 DB_PW=Auto012022 PORT=5000 nodemon index
/// Todo: NODE_ENV=_production DB_ID=Aurelien49 DB_PW=Auto012022 PORT=5000 API_KEY_SENDGRID=SG.Wmbz1LfjQ0-9gAU8GFZhPw.R6S63MB6RjlCv9dkPhzfBPt9xc3UULeK0snFMhlnQv^C nodemon index