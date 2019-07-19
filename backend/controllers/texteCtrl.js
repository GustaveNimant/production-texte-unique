const texteModel = require('../models/texteModel');

exports.createTexte = (req, res, next) => {
    console.log('Entrée dans le controller createTexte avec req.body ', req.body);

    const texte = new texteModel({
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	participantId: req.body.participantId
    });
    console.log('le texte', texte);
    texte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post saved successfully!'
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

exports.getOneTexte = (req, res, next) => {
    console.log('Entrée dans getOneTexte avec req.body ', req.body);
    console.log('Entrée dans getOneTexte avec req.params.id ', req.params.id);
    
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

exports.modifyTexte = (req, res, next) => {
    console.log('Entrée dans modifyTexte avec req.body ', req.body);
    console.log('Entrée dans modifyTexte avec req.params.id ', req.params.id);
    
    const texte = new texteModel({
	_id: req.params.id, /* to keep the_id */
	titre: req.body.titre,
	contenu: req.body.contenu,
	shasum: req.body.shasum,
	noteMoyenne: req.body.noteMoyenne,
	participantId: req.body.participantId
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

exports.deleteTexte = (req, res, next) => {
    console.log('Entrée dans deleteTexte avec req.body ', req.body);
    console.log('Entrée dans deleteTexte avec req.params.id ', req.params.id);
    
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

exports.getAllTexte = (req, res, next) => {
    console.log('Entrée dans getAllTexte avec req.body ', req.body);

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

// module.exports = texteCtrl.js;
