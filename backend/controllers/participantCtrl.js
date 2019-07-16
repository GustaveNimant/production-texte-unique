const bcrypt = require('bcrypt');
const participantModel = require('../models/participantModel');

const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
	.then(
	    (password_hash) => {
		console.log('SIGNUP req.body.password is', req.body.password);
		console.log('SIGNUP password_hash                 is', password_hash);
		console.log('SIGNUP password_hash                           1234567890123456789012');
		const salt = bcrypt.genSalt(10, function(err, a_salt) {
		    console.log('SIGNUP salt is', a_salt);
		});
		const participant = new participantModel({
		    email: req.body.email,
		    password: password_hash
		});
		
		participant.save()
		    .then(
			() => {
			    res.status(201).json({
				message: 'Participant added successfully!'
			    });
			})
		    .catch(
			(error) => {
			    console.log('SIGNUP Error at signup password_hash is',password_hash);
			    res.status(500).json({
				error: error
			    });
			});
	    }
	);
};

exports.login = (req, res, next) => {
    /* look at database if participant with that email exists */
    participantModel.findOne({ email: req.body.email }).then(
	(participant) => {
	    if (!participant) {
		return res.status(401).json({
		    error: new Error('login : Participant not found!')
		});
	    }
	    console.log('LOGIN participant email', email,' participant.password_hash is ', participant.password_hash);
	    bcrypt.compare(req.body.password, participant.password_hash)
		.then(
		    (valid) => {
			if (!valid) {
			    return res.status(401).json({
				error: new Error('login : Incorrect password!')
			    });
			}
			console.log('LOGIN req.body.password is ', req.body.password);
			console.log('LOGIN participant.password_hash is ', participant.password_hash);
			
			const token = jwt.sign(
			    { participantId: participant._id },
			    //{ participantPassword : 'truc'},
				      { participantPassword : participant.password_hash },
				      { expiresIn: '24h' });
				  console.log('LOGIN token is', token);
				  res.status(200).json({
				      participantId: participant._id,
				      token: token
				  });
			      } 
			  ).catch(
			      (err) => {
				  console.log('LOGIN Error password_hash is',participant.password_hash);
				  res.status(500).json({
				      error: err
				  });
			      }
			  );
	}
    ).catch(
	(error) => {
	    res.status(500).json({
		error: error
	    });
	}
    );
};
