const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { /* lambda function */
    try {
	console.log('Entrée dans auth.js avec req.body', req.body);

	console.log('Dans auth.js req.headers', req.headers);
	const authHeader = req.headers.authorization;
	console.log('Dans auth.js authHeader', authHeader);
	const token = authHeader.split(' ')[1];
	console.log('Dans auth.js : JWT token >',token,'<');
	
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	console.log('Dans auth.js decodedToken',decodedToken);
	
	const connexionId = decodedToken.connexionId;
	console.log('Dans auth.js connexionId',connexionId);
	console.log('Dans auth.js req.body.connexionId', req.body.connexionId);
	
	if (req.body.connexionId && req.body.connexionId !== connexionId) {
	    throw 'Dans auth.js : connexionId invalide';
	} else {/* everything is ok */
	    console.log('Dans auth.js : aller à next()');
	    next();
	}
    } catch {
	console.log('Dans auth.js Erreur 401');
	res.status(401).json({
	    error: new Error('Dans auth.js Erreur: requête invalide!')
	});
    }
};

