const express = require('express');
const router = express.Router();

const texteCtrl = require('../controllers/texteCtrl');
// Improve const auth = require('../middleware/auth');

router.get('/',   texteCtrl.getAllTexteCtrl);
router.post('/',  texteCtrl.createTexteCtrl);
router.get('/:id',   texteCtrl.getOneTexteCtrl);
router.put('/:id',  texteCtrl.modifyTexteCtrl);
router.delete('/:id',   texteCtrl.deleteTexteCtrl);

module.exports = router;
