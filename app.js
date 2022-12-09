//region Imports
const express = require('express'); // framework
const helmet = require('helmet'); // Configure HTTP Headers
const bodyParser = require('body-parser'); // Parse the body in an object req.body
const mongoose = require('mongoose'); // Database
const compression = require('compression'); // Compression for quick server response
const winston = require('winston');
const l = require('./log/main_logger');
//endregion

// region Express
const app = express(); // creation de l'application grace au framework
app.use(helmet());
app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ID et pw à cacher dans des variables d'environnement
console.log('process.env.DB_ID', process.env.DB_ID);
console.log('process.env.DB_PW', process.env.DB_PW);

// node index.js Aurelien49 Auto012022
console.log('process.argv[2]', process.argv[2]);
console.log('process.argv[3]', process.argv[3]);

const dbID = process.env.DB_ID || process.argv[2];
const dbPW = process.env.DB_PW || process.argv[3];

const DB = 'mongodb+srv://' + dbID + ':' + dbPW + '@cluster-memes.ps0ycgy.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });

app.use(bodyParser.json());

// import des routes
const objectRoutes = require('./routes/object');
const userRoutes = require('./routes/user');

app.use('/api/objects', objectRoutes);
app.use('/api/users', userRoutes);
app.get('/', function (req, res) {
    l.i('Le serveur à répondu');
    res.setHeader("Content-type", "text/html; charset=ut-8");
    res.send("<h1>Le serveur à répondu !</h1>");
});
// endregion

// region Exports
// exportation pour être utilisé par d'autres fichiers
module.exports = app;
// endregion

// navigator.storage et/ou window.sessionStorage et/ou window.localStorage et/ou cookies


