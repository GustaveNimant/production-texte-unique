const jwt = require('jsonwebtoken');

const authentification =
    (req, res, next) => { /* lambda function */
	try {
	    console.log('Entrée dans authentification avec req ', req);
	    
	    const authHeader = req.headers.authorization;
	    const token = authHeader.split(' ')[1];
	    console.log('In authorization : JWT token >',token,'<');
	    
	    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

	    const participantId = decodedToken.participantId;
	    if (req.body.participantId && req.body.participantId !== participantId) {
		throw 'In auth.js exports : Invalid participant ID';
	    } else {/* everything is ok */
		console.log('Dans authentification : aller à next()');
		next();
	    }
	} catch {
	    console.log('Erreur 401 dans authentification');
	    res.status(401).json({
		error: new Error('Error in authentification : Invalid request!')
	    });
	}
    };

module.exports = authentification;
