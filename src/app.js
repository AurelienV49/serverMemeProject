const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();

app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import des routes
const objectRoutes = require('./routes/meme_routes');
const userRoutes = require('./routes/user_routes');

app.use('/api/memes', objectRoutes);
app.use('/api/users', userRoutes);

module.exports = app;




