const express = require('express');
const router = express.Router();
const objectCtrl = require('../controllers/meme_controller');
const auth = require("../middlewares/auth");

router.get('/bdduser/:id', [auth], objectCtrl.getMeme);
router.get('/memes-user-history/:id', [auth], objectCtrl.getMemesUserHistory);
router.get('/imgflip/', objectCtrl.getMemesFromImgFlip);
router.post('/createMeme/', [auth], objectCtrl.createMeme);
router.put('/updateMemeBdduser/:id', [auth], objectCtrl.updateMeme);
router.delete('/deleteMemeBdduser/:id', [auth], objectCtrl.deleteMeme);

module.exports = router;