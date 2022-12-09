const Object = require('../models/object');
const l = require("../log/main_logger");

exports.getObjectList = (req, res, next) => {
    console.log('Méthode getObjectList');

    Object.find()
        .then((list) => {
            l.i(`getObjectList from ${req.body.email}`);
            res.status(200).json(list)
        })
        .catch((err) => {
            l.e(`getObjectList from ${req.body.email}: NOT FOUND`);
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getObject = (req, res, next) => {
    console.log('Méthode getObject', req.params);
    Object.findById(req.params.id)
        .then((obj) => {
            l.i(`getObject from ${req.body.email}`);
            res.status(200).json(obj)
        })
        .catch((err) => {
            l.e(`getObject from ${req.body.email}: NOT FOUND`);
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createObject = (req, res, next) => {
    console.log('Méthode createObject', req.body);

    let obj = new Object({
        name: req.body.name,
        weight: req.body.weight,
        url: req.body.url,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    obj.save()
        .then((saved) => {
            l.e(`createObject from ${req.body.email}`);
            res.status(200).json(saved)
        })
        .catch(() => {
            l.e(`createObject from ${req.body.email}: API REST ERROR: Pb avec la creation`);
            res.status(500).json({message: 'API REST ERROR: Pb avec la creation'})
        })
}

exports.updateObject = (req, res, next) => {
    console.log('Méthode updateObject ' + req.params.id, req.body);

    Object.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            Object.updateOne({_id: obj.id}, req.body)
                .then((result) => {
                    l.i(`updateObject from ${req.body.email}`);
                    res.status(200).json(result)
                })
                .catch((err) => {
                    l.e(`updateObject from ${req.body.email}: CANNOT UPDATE`);
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch(() => {
            l.e(`updateObject from ${req.body.email}: NOT FOUND`);
            res.status(404).json({message: 'NOT FOUND'})
        })
}

exports.deleteObject = (req, res, next) => {
    console.log('Méthode deleteObject ', req.params.id);

    Object.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                l.e(`deleteObject from ${req.body.email}`);
                res.status(200).json(result)
            } else {
                l.e(`deleteObject from ${req.body.email}: ALREADY DELETED`);
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            l.e(`deleteObject from ${req.body.email}: NOT FOUND`);
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}
