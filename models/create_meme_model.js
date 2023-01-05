const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    idUser: {type: String, required: true},
    urlToRetriveMeme: {type: String, required: true},
    creationDate: {type: Date, required: true},
    modificationDate: {type: Date, required: false},
    meme_id: {type: String, required: true},
    meme_name: {type: String, required: true},
    meme_width: {type: String, required: true},
    meme_height: {type: String, required: true},
    meme_box_count: {type: String, required: true},
    meme_captions: {type: String, required: true},
    urlToGenerateMeme: {type: String, required: true},
    commentBoxes: {type: Object, required: true},
});

module.exports = mongoose.model('create-meme-model', objectSchema);