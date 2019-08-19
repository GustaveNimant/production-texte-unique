const participantModel = require('../models/participantModel');

exports.createParticipant = (req, res, next) => {
    console.log('Entrée dans createParticipant avec req.body ', req.body);

    const participant = new participantModel({
	pseudo: req.body.pseudo,
	email: req.body.email,
	cle_publique: req.body.cle_publique,
	connexionId: req.body.connexionId
    });
    
    participant.save()
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

exports.getOneParticipant = (req, res, next) => {
    console.log('Entrée dans getOneParticipant avec req.body ', req.body);
    console.log('Entrée dans getOneParticipant avec req.params.id ', req.params.id);
    
    participantModel.findOne({
	_id: req.params.id
    })
	.then(
	    (participant) => {
		res.status(200).json(participant);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyParticipant = (req, res, next) => {
    console.log('Entrée dans modifyParticipant avec req.body ', req.body);
    console.log('Entrée dans modifyParticipant avec req.params.id ', req.params.id);
    
    const participant = new participantModel({
	_id: req.params.id, /* to keep the_id */
	pseudo: req.body.pseudo,
	email: req.body.email,
	cle_publique: req.body.cle_publique,
	connexionId: req.body.connexionId
    });

    participantModel.updateOne({_id: req.params.id}, participant)
	.then(
	    () => {
		res.status(201).json({
		    message: 'participantModel updated successfully!'
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

exports.deleteParticipant = (req, res, next) => {
    console.log('Entrée dans deleteParticipant avec req.body ', req.body);
    console.log('Entrée dans deleteParticipant avec req.params.id ', req.params.id);
    
    participantModel.deleteOne({_id: req.params.id})
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

exports.getAllParticipant = (req, res, next) => {
    console.log('Entrée dans getAllParticipant avec req.body ', req.body);

    participantModel.find()
	.then(
	    (des_participants) => {
		res.status(200).json(des_participants);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};
