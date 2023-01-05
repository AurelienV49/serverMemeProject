const CreateMemeModel = require('../models/create_meme_model');
const imgModel = require('../models/model');
const multer = require('multer');
const express = require("express");
const cloudinary = require('cloudinary').v2;
const router = express.Router();

exports.getMeme = (req, res, next) => {
    console.log('getMeme: ', req.params.id);

    CreateMemeModel.findById(req.params.id)
        .then((obj) => {
            res.status(200).json(obj)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getMemesUserHistory = (req, res, next) => {
    console.log('getMemesUserHistory: ');

    CreateMemeModel.find()
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getMemesFromImgFlip = (req, res, next) => {
    console.log('getMemesFromImgFlip: ');

    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
                this.memes = data['data']['memes'];
                this.memes.length = 10;

                res.status(200).json(data)
            }
        ).catch(err => {
            console.error(err);
        }
    );
}

exports.createMeme = (req, res, next) => {
    let req_body = req.body;

    fetch(req_body.data.urlToGenerateMeme)
        .then(response =>
            response.json()
        )
        .then(data =>
            data['data']
        )
        .then(async data => {
                // And then, save typed meme into database
                let _createMemeModelToSave = new CreateMemeModel({
                    idUser: "1234",
                    urlToRetriveMeme: data['url'],
                    creationDate: new Date(),
                    modificationDate: new Date(),
                    meme_id: req_body.data.meme_id,
                    meme_name: req_body.data.meme_name,
                    meme_width: req_body.data.meme_width,
                    meme_height: req_body.data.meme_height,
                    meme_box_count: req_body.data.meme_box_count,
                    meme_captions: req_body.data.meme_captions,
                    urlToGenerateMeme: req_body.data.urlToGenerateMeme,
                    commentBoxes: req_body.data.commentBoxes,
                })
                return await _createMemeModelToSave.save()
                    .then(async (saved) => {
                        console.log('Server: record into DB ok : ');
                        return saved;
                    })
                    .catch(() => {
                        res.status(500).json({
                            message: 'message du serveur: problème à la sauvegarde en base du mème'
                        })
                    });
            }
        ).catch(err => {
            console.error(err);
        }
    );
}

exports.updateMeme = (req, res, next) => {
    console.log('updateMeme: id = ' + req.params.id, req.body);

    CreateMemeModel.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            CreateMemeModel.updateOne({_id: obj.id}, req.body)
                .then((result) => {
                    res.status(200).json(result)
                })
                .catch((err) => {
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch(() => {
            res.status(404).json({message: 'NOT FOUND'})
        })
}

exports.deleteMeme = (req, res, next) => {
    console.log('deleteMeme : id = ', req.params.id);

    CreateMemeModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
                res.status(400).json({message: 'NOT FOUND', error: err})
            }
        )
}
