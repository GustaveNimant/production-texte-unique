const connexionModel = require('../models/connexionModel');

exports.createConnexionCtrl = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.createConnexionCtrl avec req.body ', req.body);

    const connexion = new connexionModel({
	email: req.body.email,
	password: req.body.password,
    });
    
    connexion.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		console.log('Dans connexionCtrl.js.createConnexionCtrl Erreur ', error);
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneConnexionCtrl = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.getOneConnexionCtrl avec req.body ', req.body);
    console.log('Entrée dans connexionCtrl.js.getOneConnexionCtrl avec req.params.id ', req.params.id);
    
    connexionModel.findOne({
	_id: req.params.id
    })
	.then(
	    (connexion) => {
		res.status(200).json(connexion);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyConnexionCtrl = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.modifyConnexionCtrl avec req.body ', req.body);
    console.log('Entrée dans connexionCtrl.js.modifyConnexionCtrl avec req.params.id ', req.params.id);
    
    const connexion = new connexionModel({
	_id: req.params.id, /* to keep the_id */
	email: req.body.email,
	password: req.body.password,
    });

    connexionModel.updateOne({_id: req.params.id}, connexion)
	.then(
	    () => {
		res.status(201).json({
		    message: 'connexionModel updated successfully!'
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

exports.deleteConnexionCtrl = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.deleteConnexionCtrl avec req.body ', req.body);
    console.log('Entrée dans connexionCtrl.js.deleteConnexionCtrl avec req.params.id ', req.params.id);
    
    connexionModel.deleteOne({_id: req.params.id})
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

exports.getAllConnexionCtrl = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.getAllConnexionCtrl avec req.body ', req.body);

    connexionModel.find()
	.then(
	    (des_connexions) => {
		res.status(200).json(des_connexions);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
