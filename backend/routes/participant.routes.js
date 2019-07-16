const express = require('express');
const participantRoutes = express.Router();

const participantCtrl = require('../controllers/participantCtrl');

participantRoutes.post('/signup', participantCtrl.signup);
participantRoutes.post('/login', participantCtrl.login); /* get ? */

module.exports = participantRoutes;
