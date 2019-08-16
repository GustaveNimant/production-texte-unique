const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db_config = require('./models/db_config');

const connexionRoutes  = require('./routes/connexion.routes');
const participantRoutes  = require('./routes/participant.routes');
const texteRoutes = require('./routes/texte.routes');

const app = express();

mongoose.Promise = global.Promise;

app.use((req, res, next) => { /* no route : applies to all incoming requests */
    res.setHeader('Access-Control-Allow-Origin', '*'); /* always ajout 26 Juin 2019 */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); /* receive things as a json Object */

app.use('/api/auth', connexionRoutes); /* connexion route to /api/auth/login /api/auth/signup */
app.use('/api/les-textes', texteRoutes); /* main route */
app.use('/api/les-participants', participantRoutes); 

mongoose.connect(db_config.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
}) /* asked when launching nodemon */
    .then( /* Promise */
	() => {console.log('La base de données est connectée à Uri', db_config.DB_URI)}
    )
    .catch ((error) => {
	console.log('Impossible de se connecter à la base de données', db_config.DB_URI);
	console.error(error);
    });

module.exports = app;
