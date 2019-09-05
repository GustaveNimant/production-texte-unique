const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const notationCtrl = require('../controllers/notationCtrl');

router.get('/', notationCtrl.getAllNotationCtrl);
router.post('/', notationCtrl.createNotationCtrl); 
router.get('/:id', notationCtrl.getOneNotationCtrl);
router.delete('/:id', notationCtrl.deleteNotationCtrl);

module.exports = router;
