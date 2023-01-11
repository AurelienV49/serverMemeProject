const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const l = require('./log/main_logger');
const PORT = require('./index');
const upload = require("./middlewares/upload");

const app = express();
app.use(helmet());
app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*
const DB = 'mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PW + '@cluster-memes.ps0ycgy.mongodb.net/?retryWrites=true&w=majority';

mongooseApp.connect(DB, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });
 */

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import des routes
const objectRoutes = require('./routes/meme_routes');
const userRoutes = require('./routes/user_routes');

app.use('/api/memes', objectRoutes);
app.use('/api/users', userRoutes);
app.get('/', function (req, res) {
    res.setHeader("Content-type", "text/html; charset=ut-8");
    res.send("<h1>Le serveur à répondu et est connecté sur le port " + PORT.PORT + " !</h1>");
});


module.exports = app;



