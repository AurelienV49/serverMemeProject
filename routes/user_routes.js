const express = require('express');
const router = express.Router(); // router intégré au framework

// import des middlewares qui seront appelés avant la méthode finale
const auth = require('../middlewares/auth');

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const userCtrl = require('../controllers/user_controller');

// routes CRUD disponibles
router.get('/', [auth], userCtrl.getUserList);
router.get('/:id', [auth], userCtrl.getUser);
router.post('/signup', userCtrl.createUser);
router.post('/signin', userCtrl.login);
router.put('/:id', [auth], userCtrl.updateUser);
router.delete('/:id', [auth], userCtrl.deleteUser);

module.exports = router;