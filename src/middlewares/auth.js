const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const l = require('../log/main_logger');


module.exports = (req, res, next) => { // next() sert à passer le relai au middleware suivant
    console.log('+++++++++++++++++++++++++++++++++++++++++++++ Dans Auth');
    try {
        console.log('req.headers.email: ', req.headers.email);
        console.log('req.headers.authorization: ', req.headers.authorization);
        const email = req.headers.email;
        const token = req.headers.authorization;
        let decodeToken = "";

        try {
            decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        } catch {
            l.e(`Echec décodage du token`);
            console.log(`Echec décodage du token`);
        }

        console.log('decodeToken: ', decodeToken);
        console.log(1)
        User.findById(decodeToken.userId)
            .then((user) => {
                console.log(2);
                if (email === user.email) {
                    l.i(`Succès: user enregistré avec l'email : ${email}`);
                    next();
                } else {
                    l.e(`Echec: UNAUTHORIZED 1 : un user a voulu s'enregistrer avec l'email : ${email}`);
                    res.status(403).json({message: 'UNAUTHORIZED 1'});
                }
            })
            .catch(() => {
                l.e(`Echec: UNAUTHORIZED 2`);
                res.status(403).json({message: 'UNAUTHORIZED 2'})
            })

        console.log(3)
    } catch {
        l.e(`Echec: UNAUTHORIZED 3`);
        res.status(403).json({message: 'UNAUTHORIZED 3'})
    }
};