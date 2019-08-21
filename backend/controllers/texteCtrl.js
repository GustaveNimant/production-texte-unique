const texteModel = require('../models/texteModel');

exports.createTexteCtrl = (req, res, next) => {
    console.log('Entrée dans texteCtrl.js.createTexteCtrl avec req.body ', req.body);

    const texte = new texteModel({
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId
    });
    
    texte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		console.log('Dans texteCtrl.js.createTexteCtrl Erreur ', error);
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneTexteCtrl = (req, res, next) => {
    console.log('Entrée dans texteCtrl.js.getOneTexteCtrl avec req.body ', req.body);
    console.log('Entrée dans texteCtrl.js.getOneTexteCtrl avec req.params.id ', req.params.id);
    
    texteModel.findOne({
	_id: req.params.id
    })
	.then(
	    (texte) => {
		res.status(200).json(texte);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyTexteCtrl = (req, res, next) => {
    console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.body ', req.body);
    console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.params.id ', req.params.id);
    
    const texte = new texteModel({
	_id: req.params.id, /* to keep the_id */
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	noteEcartType: req.body.noteEcartType,
	auteurId: req.body.auteurId
    });

    texteModel.updateOne({_id: req.params.id}, texte)
	.then(
	    () => {
		res.status(201).json({
		    message: 'texteModel updated successfully!'
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

exports.deleteTexteCtrl = (req, res, next) => {
    console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.body ', req.body);
    console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.params.id ', req.params.id);
    
    texteModel.deleteOne({_id: req.params.id})
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

exports.getAllTexteCtrl = (req, res, next) => {
    console.log('Entrée dans texteCtrl.js.getAllTexteCtrl avec req.body ', req.body);

    texteModel.find()
	.then(
	    (des_textes) => {
		res.status(200).json(des_textes);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
