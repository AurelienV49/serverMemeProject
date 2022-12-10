const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    idUser: {type: String, required: false},
    urlToRetriveMeme: {type: String, required: true},
    creationDate: {type: Date, required: true},
    modificationDate: {type: Date, required: false},
    movie_id: {type: String, required: true},
    movie_name: {type: String, required: true},
    movie_width: {type: String, required: true},
    movie_height: {type: String, required: true},
    movie_box_count: {type: String, required: true},
    movie_captions: {type: String, required: true},
    urlToGenerateMeme: {type: String, required: true},
    commentBoxes: {type: Object, required: true},
});

module.exports = mongoose.model('create-meme-model', objectSchema);