const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    idUser: {type: String, required: false},
    url: {type: String, required: true},
    creationDate: {type: Date, required: true},
    modificationDate: {type: Date, required: false}
});

module.exports = mongoose.model('create-meme-model', objectSchema);