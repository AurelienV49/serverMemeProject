const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const l = require('../log/main_logger');
const sgMail = require('@sendgrid/mail');

//
const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

async function verify(token, req, res) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
//  const userid = payload['sub'];
//  const userid = payload.sub;

    console.log(payload);

    User.findOne({email: payload.email})
        .then((user) => {
            if (!user) {
                // create user
                req.body.email = payload.email;
                req.body.name = payload.name;
                req.body.password = payload.sub + new Date().getTime();
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        let user = new User({
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            creationDate: new Date(),
                            modificationDate: new Date(),
                            active: true
                        });

                        user.save()
                            .then((saved) => {

                                res.status(200).json(saved)
                            })
                            .catch(() => res.status(500).json({message: 'API REST ERROR: Pb avec la creation'}))
                    })
                    .catch(() => res.status(500).json({message: 'API REST ERROR: Pb avec le chiffrement'}))
            } else {
                const token = jwt.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
                user.password = '';
//            user.name = payload.name;
                res.status(200).json({
                    token: token,
                    user: user
                })
            }
        }).catch((error) => {
        res.status(500).json({message: 'Request Error'});
    })
}

exports.getUserList = (req, res, next) => {
    console.log('Méthode getUserList');

    User.find()
        .then((list) => {
            l.i(`getUserList from ${req.headers.email}`);
            res.status(200).json(list);
        })
        .catch((err) => {
            console.log(err);
            l.e(`getUserList from ${req.headers.email}: NOT FOUND`);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getUser = (req, res, next) => {
    console.log('Méthode getUser', req.params);
    User.findById(req.params.id)
        .then((user) => {
            l.i(`getUser from ${req.headers.email}`);
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err);
            l.e(`getUser from ${req.headers.email}: NOT FOUND`);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true
            });

            l.i(`createUser from ${req.body.email}`);

            user.save()
                .then((saved) => {
                    l.i(`createUser/save from ${req.body.email}`);
                    res.status(200).json(saved)
                })
                .catch(() => {
                    l.e(`createUser/save from ${req.body.email}: API REST ERROR: Pb avec la creation`);
                    res.status(500).json({message: 'API REST ERROR: Pb avec la creation'})
                })
        })
        .catch(() => {
            l.e(`createUser from ${req.body.email}: API REST ERROR: Pb avec le chiffrement`);
            res.status(500).json({message: 'API REST ERROR: Pb avec le chiffrement'})
        })
}

exports.login = (req, res, next) => {
    console.log(req.body);
    let token = req.body.token;

    if (token) {
        verify(token, req, res).catch(() => {
            l.e(`login/token from ${req.body.email}`);
            console.error
        });
    } else {
        User.findOne({email: req.body.email})
            .then((user) => {
                if (!user) {
                    l.e(`login from ${req.body.email}: USER RESULT NULL`);
                    res.status(404).json({message: 'USER RESULT NULL'})
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then((valid) => {
                            if (!valid) {
                                l.e(`login from ${req.body.email}: API REST ERROR: COMPARISON FAILED`);
                                res.status(500).json({message: 'API REST ERROR: COMPARISON FAILED'})
                            } else {
                                l.i(`login from ${req.body.email}`);
                                const token = jwt.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'});
                                user.password = '';
                                res.status(200).json({
                                    token: token,
                                    user: user
                                })
                            }
                        })
                        .catch((err) => {
                            l.e(`login from ${req.body.email}: API REST ERROR: COMPARISON FAILED`);
                            res.status(500).json({message: 'API REST ERROR: COMPARISON FAILED'})
                        })
                }
            })
            .catch(() => {
                    l.e(`login from ${req.body.email}: NOT FOUND`);
                    res.status(404).json({message: 'NOT FOUND'})
                }
            )
    }
}

exports.sendpicture = (req, res, next) => {
    sgMail.setApiKey(process.env.API_KEY_SENDGRID);
    const msg = {
        to: req.body.user_email.toString(),
        from: 'aurelienvaillant@outlook.fr',
        subject: 'Your wonderfull meme 😎😎😎',
        text: 'Super cool nodjs et l\'API SendGrid',
        html: `<strong>TP Ynov 2022/2023</strong> 
            '<ul>\n 
              <li><a href=${req.body.url_meme_to_retrive}>🎏 Click to see your awesome meme 🎨</a></li>\n 
            </ul>
            <img alt="test" src=${req.body.url_meme_to_retrive}>
            `,
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({message: 'Meme picture send by email'})
        }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
}

exports.updateUser = (req, res, next) => {
    console.log('Méthode updateUser ' + req.params.id, req.body);

    User.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            User.updateOne({_id: obj.id}, req.body)
                .then((result) => {
                    l.i(`updateUser from ${req.body.email}`);
                    res.status(200).json(result)
                })
                .catch((err) => {
                    l.e(`updateUser from ${req.body.email}: CANNOT UPDATE`);
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch(() => {
            l.e(`updateUser from ${req.body.email}: NOT FOUND`);
            res.status(404).json({message: 'NOT FOUND'})
        })
}

exports.deleteUser = (req, res, next) => {
    console.log('Méthode deleteUser ', req.params.id);

    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                l.i(`deleteUser from ${req.body.email}`);
                res.status(200).json(result)
            } else {
                l.e(`deleteUser from ${req.body.email}: ALREADY DELETED`);
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            l.e(`deleteUser from ${req.body.email}: NOT FOUND`);
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}