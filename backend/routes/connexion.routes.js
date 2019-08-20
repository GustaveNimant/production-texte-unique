const express = require('express');
const connexionRoutes = express.Router();

const connexionCtrl = require('../controllers/connexionCtrl');
// FCC const auth = require('../middleware/auth');

connexionRoutes.post('/signup', connexionCtrl.signup);
connexionRoutes.post('/login', connexionCtrl.login); /* get ? */

module.exports = connexionRoutes;
