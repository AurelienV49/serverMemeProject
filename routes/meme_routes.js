const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const objectCtrl = require('../controllers/meme_controller');

// routes CRUD disponibles
router.get('/bdduser/:id', objectCtrl.getMeme);
router.get('/memes-user-history/:id', objectCtrl.getMemesUserHistory);
router.get('/imgflip/', objectCtrl.getMemesFromImgFlip);
router.post('/createMeme/', objectCtrl.createMeme);
router.put('/updateMemeBdduser/:id', objectCtrl.updateMeme);
router.delete('/deleteMemeBdduser/:id', objectCtrl.deleteMeme);

module.exports = router;