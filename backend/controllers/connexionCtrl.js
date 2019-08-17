const bcrypt = require('bcrypt');
const connexionModel = require('../models/connexionModel');

const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    console.log('Dans login req.body est', req.body);
    console.log('Dans login req.body.email est', req.body.email);
    connexionModel.findOne({ email: req.body.email })
	.then(
	    (connexion) => {
		if (!connexion) {
		    return res.status(401).json({
			error: new Error('login : Participant not found!')
		    });
		}
		console.log('Dans login connexion email', email);
	    }
	).catch(
	    (error) => {
		console.log('Dans login Erreur est ',error);
		res.status(500).json({
		    error: error
		});
	    }
	);
};

exports.signup = (req, res, next) => {
    console.log('Dans signup req.body est', req.body);
    const connexion = new connexionModel(req.body);
    console.log('Dans signup connexion est', connexion);
    connexion.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Dans signup Le connexion a été ajouté avec succès !'
		});
	    })
	.catch(
	    (error) => {
		console.log('Dans signup Erreur est ', error);
		res.status(500).json({
		    error: error
		});
	    });
};
