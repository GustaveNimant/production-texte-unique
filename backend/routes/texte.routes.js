const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const texteCtrl = require('../controllers/texteCtrl');

// auth as 2nd argument 
router.get('/', auth, texteCtrl.getAllTexteCtrl);
// Improve router.post('/', texteCtrl.createTexteCtrl);
router.post('/', auth, multer, texteCtrl.createTexteWithImageCtrl); /* post route modified */ 
router.get('/:id', auth, texteCtrl.getOneTexteCtrl);
router.put('/:id', auth, multer, texteCtrl.modifyTexteCtrl);  /* put  route modified */
router.delete('/:id', auth, texteCtrl.deleteTexteCtrl);

module.exports = router;
