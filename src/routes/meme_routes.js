const express = require('express');
const router = express.Router();
const objectCtrl = require('../controllers/meme_controller');

router.get('/bdduser/:id', objectCtrl.getMeme);
router.get('/memes-user-history/:id', objectCtrl.getMemesUserHistory);
router.get('/imgflip/', objectCtrl.getMemesFromImgFlip);
router.post('/createMeme/', objectCtrl.createMeme);
router.put('/updateMemeBdduser/:id', objectCtrl.updateMeme);
router.delete('/deleteMemeBdduser/:id', objectCtrl.deleteMeme);

module.exports = router;