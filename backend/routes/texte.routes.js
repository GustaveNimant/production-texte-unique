const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const texteCtrl = require('../controllers/texteCtrl');

// auth as 2nd argument 
router.get('/', texteCtrl.getAllTexteCtrl);
// Improve router.post('/', texteCtrl.createTexteCtrl);
router.post('/', multer, texteCtrl.createTexteWithImageCtrl); /* post route modified */ 
router.get('/:id', texteCtrl.getOneTexteCtrl);
router.put('/:id', multer, texteCtrl.modifyTexteCtrl);        /* put  route modified */
router.delete('/:id', texteCtrl.deleteTexteCtrl);

module.exports = router;
