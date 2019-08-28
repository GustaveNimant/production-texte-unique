const connexionModel = require('../models/connexionModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 8)
	.then(
	    (a_password_hash) => {
		console.log('Dans connexionCtrl.js.signup a_password_hash', a_password_hash);
		console.log('Dans connexionCtrl.js.signup req.body.password', req.body.password);

		const connexion = new connexionModel({
		    email: req.body.email,
		    password: a_password_hash
		});
		console.log('Dans connexionCtrl.js.signup connexion', connexion);
		connexion.save() /* dans BD */
		    .then(
			() => {
			    res.status(201).json({
				message: 'Connexion added successfully!'
			    });
			})
		    .catch(
			(error) => {
			    console.log('Dans connexionCtrl.js.signup a_password_hash', a_password_hash);
			    console.log('Dans connexionCtrl.js.signup Erreur', error);
			    res.status(500).json({
				error: error
			    });
			});
	    }
	);
};

exports.login = (req, res, next) => {
    console.log('Entrée dans connexionCtrl.js.login avec req.body',req.body);
    console.log('Dans connexionCtrl.js.login req.body.email', req.body.email);
    connexionModel.findOne({ email: req.body.email }).
	then( /* mongoose method */
	    (une_connexion) => {
		console.log('Dans connexionCtrl.js.login une_connexion', une_connexion);

		if (!une_connexion) {
		    return res.status(401).json({
			error: new Error('connexionCtrl.js.login : Connexion not found!')
		    });
		}
		console.log('Dans connexionCtrl.js.login req.body.password', req.body.password);
		console.log('Dans connexionCtrl.js.login une_connexion.password', une_connexion.password);
		bcrypt.compare(req.body.password, une_connexion.password)
		    .then(
			(valid) => {
			    if (!valid) {
				return res.status(401).json({
				    error: new Error('connexionCtrl.js.login : Incorrect password!')
				});
			    }
			    console.log('Dans connexionCtrl.js.login req.body.password', req.body.password);
			    console.log('Dans connexionCtrl.js.login une_connexion.password', une_connexion.password);
			    
			    const token = jwt.sign( /* JWT encode new token */
				{ connexionId: connexion._id },
				'RANDOM_TOKEN_SECRET',
				{ expiresIn: '24h' });
			    console.log('Dans connexionCtrl.js.login nouveau token', token);
			    res.status(200).json({
				connexionId: connexion._id,
				token: token
			    });
			} 
		    ).catch(
			(error) => {
			    console.log('Dans connexionCtrl.js.login req.body.password', req.body.password);
			    console.log('Dans connexionCtrl.js.login une_connexion.password', une_connexion.password);
			    console.log('Dans connexionCtrl.js.login Erreur req.body.password et a_password_hash diffèrent');
			    res.status(500).json({
				error: error
			    });
			}
		    );
	    }
	).catch(
	    (error) => {
		console.log('Dans connexionCtrl.js.login email inconnu',req.body.email);
		res.status(500).json({
		    error: error
		});
	    }
	);
};

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
