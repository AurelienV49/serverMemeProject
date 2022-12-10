const express = require('express');
const router = express.Router(); // router intégré au framework

// import des middlewares qui seront appelés avant la méthode finale
const auth = require('../middlewares/auth');

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const objectCtrl = require('../controllers/meme_controller');

// routes CRUD disponibles
router.get('/bdduser/:id', objectCtrl.getMeme);
router.get('/memes-user-history/', objectCtrl.getMemesUserHistory);
router.get('/imgflip/', objectCtrl.getMemesFromImgFlip);
router.post('/createMeme/', objectCtrl.createMeme);
router.put('/updateMemeBdduser/:id', objectCtrl.updateMeme);
router.delete('/deleteMemeBdduser/:id', objectCtrl.deleteMeme);

module.exports = router;