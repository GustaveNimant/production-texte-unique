const express = require('express');
const connexionRoutes = express.Router();

const connexionCtrl = require('../controllers/connexionCtrl');
// FCC const auth = require('../middleware/auth');

connexionRoutes.post('/signup', connexionCtrl.signup);
connexionRoutes.post('/login', connexionCtrl.login); /* post => empty output */
//connexionRoutes.get('/login', connexionCtrl.login); /* get => 404 */
//connexionRoutes.use('/login', connexionCtrl.login); /* use */

module.exports = connexionRoutes;
