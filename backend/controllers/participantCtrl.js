const bcrypt = require('bcrypt');
const participantModel = require('../models/participantModel');

const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    console.log('Dans login req.body est', req.body);
    console.log('Dans login req.body.email est', req.body.email);
    participantModel.findOne({ email: req.body.email })
	.then(
	    (participant) => {
		if (!participant) {
		    return res.status(401).json({
			error: new Error('login : Participant not found!')
		    });
		}
		console.log('Dans login participant email', email);
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
    const participant = new participantModel(req.body);
    console.log('Dans signup participant est', participant);
    participant.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Dans signup Le participant a été ajouté avec succès !'
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

