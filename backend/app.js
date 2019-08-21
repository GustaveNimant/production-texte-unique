const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db_config = require('./models/db_config');

const connexionRoutes  = require('./routes/connexion.routes');
const participantRoutes  = require('./routes/participant.routes');
const texteRoutes = require('./routes/texte.routes');

const app = express();

mongoose.Promise = global.Promise;

// CORS faire communiquer localhost:3000 et localhost:4200
app.use((req, res, next) => { /* no route : applies to all incoming requests */
    res.setHeader('Access-Control-Allow-Origin', '*'); /* always ajout 26 Juin 2019 */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());              /* reception de la requête sous forme d'Objet JSON */

app.use('/api/auth', connexionRoutes);   /* connexion route to /api/auth/login /api/auth/signup */
app.use('/api/all-textes', texteRoutes); /* main route */
app.use('/api/all-participants', participantRoutes); 

mongoose.connect(db_config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
}) /* asked when launching nodemon */
    .then( /* Promise */
	() => {console.log('Dans app.js.mongoose.connect La base de données est connectée à', db_config.DB_URI)}
    )
    .catch ((error) => {
	console.log('Dans app.js.mongoose.connect Impossible de se connecter à la base de données', db_config.DB_URI);
	console.error(error);
    });

module.exports = app;
