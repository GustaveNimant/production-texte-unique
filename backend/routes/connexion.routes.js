const express = require('express');
const connexionRoutes = express.Router();

const connexionCtrl = require('../controllers/connexionCtrl');
// FCC const auth = require('../middleware/auth');

//connexionRoutes.post('/signup', connexionCtrl.signup);
//connexionRoutes.post('/login', connexionCtrl.login); /* post => empty output */
connexionRoutes.get('/',   connexionCtrl.getAllConnexionCtrl);
connexionRoutes.post('/',  connexionCtrl.createConnexionCtrl);
connexionRoutes.get('/:id',   connexionCtrl.getOneConnexionCtrl);
connexionRoutes.put('/:id',  connexionCtrl.modifyConnexionCtrl);
connexionRoutes.delete('/:id',   connexionCtrl.deleteConnexionCtrl);

module.exports = connexionRoutes;
