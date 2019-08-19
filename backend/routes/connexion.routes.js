const express = require('express');
const connexionRoutes = express.Router();

const connexionCtrl = require('../controllers/connexionCtrl');

connexionRoutes.post('/signup', connexionCtrl.signup);
connexionRoutes.get('/login', connexionCtrl.login); /* get ? */

module.exports = connexionRoutes;
