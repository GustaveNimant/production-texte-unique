const express = require('express');
const router = express.Router();

const texteCtrl = require('../controllers/texteCtrl');
//const auth = require('../middleware/auth');

router.get('/',   texteCtrl.getAllTexte);
router.get('/:id',   texteCtrl.getOneTexte);

router.post('/part-one/new-texte',  texteCtrl.createTexte);
//router.post('/',  texteCtrl.createTexte);
router.put('/:id',  texteCtrl.modifyTexte);
router.delete('/:id',   texteCtrl.deleteTexte);

module.exports = router;
