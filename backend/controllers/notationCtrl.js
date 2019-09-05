const notationModel = require('../models/notationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Debug = require('../models/debug');

exports.createNotationCtrl = (req, res, next) => {
    console.log('Entrée dans notationCtrl.js.createNotationCtrl avec req.body ', req.body);

    const notation = new notationModel({
	email: req.body.email,
	password: req.body.password,
    });
    
    notation.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans notationCtrl.js.createNotationCtrl Erreur ', error);}
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneNotationCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getOneNotationCtrl avec req.body ', req.body);}
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.getOneNotationCtrl avec req.params.id ', req.params.id);}
    
    notationModel.findOne({
	_id: req.params.id
    })
	.then(
	    (notation) => {
		res.status(200).json(notation);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.deleteNotationCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.deleteNotationCtrl avec req.body ', req.body);}
    if (Debug.debug) {console.log('Entrée dans notationCtrl.js.deleteNotationCtrl avec req.params.id ', req.params.id);}
    
    notationModel.deleteOne({_id: req.params.id})
	.then(
	    () => {
		res.status(200).json({
		    message: 'Deleted!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getAllNotationCtrl = (req, res, next) => {
    console.log('Entrée dans notationCtrl.js.getAllNotationCtrl avec req.body ', req.body);

    notationModel.find()
	.then(
	    (des_notations) => {
		res.status(200).json(des_notations);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
