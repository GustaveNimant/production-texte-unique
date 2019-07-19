const jwt = require('jsonwebtoken');

const authentification =
    (req, res, next) => { /* lambda function */
	try {
	    console.log('Entrée dans authentification avec req.headers ', req.headers);
	    
	    const authHeader = req.headers.authorization;
	    const token = authHeader.split(' ')[1];
	    console.log('Dans authorization : JWT token >',token,'<');
	    
	    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

	    const participantId = decodedToken.participantId;
	    if (req.body.participantId && req.body.participantId !== participantId) {
		console.log('Dans authentification : req.body.participantId >', req.body.participantId'<');
		console.log('Dans authentification : participantId >', participantId'<');
		throw 'Dans authentification : ID du participant est invalide';
	    } else {/* everything is ok */
		console.log('Dans authentification : aller à next()');
		next();
	    }
	} catch {
	    console.log('Erreur 401 dans authentification');
	    res.status(401).json({
		error: new Error('Erreur dans authentification : requête invalide !')
	    });
	}
    };

module.exports = authentification;
