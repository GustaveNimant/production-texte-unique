const texteModel = require('../models/texteModel');

exports.createTexte = (req, res, next) => {
    // console.log('createTexte req from form ', req);

    const texte = new texteModel({
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
	participantId: req.body.participantId
    });
    
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
    // console.log('getOneTexte req ', req);
    
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
    // console.log('modifyTexte req from form ', req);

    const texte = new texteModel({
	_id: req.params.id, /* to keep the_id */
	title: req.body.title,
	description: req.body.description,
	imageUrl: req.body.imageUrl,
	price: req.body.price,
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
    texteModel.find()
	.then(
	    (textes) => {
		res.status(200).json(textes);
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
