const http = require('http');
const app = require('./app');
const connection = require("./db");
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

/// TODO : à supprimer : NODE_ENV=_production DB_ID=Aurelien49 DB_PW=Auto012022 PORT=5000 nodemon index