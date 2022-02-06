require('dotenv').config();

const jwt = require('jsonwebtoken');

// make sure the user is logged in - authentication
module.exports.loginRequired = (req, res, next) => {
	try {
		// see jwt documentation
		let token = req.headers.authorization.split(' ')[1];
		// decode the token
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			// if there is a user signed in
			if (decoded) {
				return next();
			}

			return next({
				status: 401,
				message: 'Please log in first'
			});
		});
	} catch (error) {
		return next({
			status: 401,
			message: 'Please log in first'
		});
	}
};

// make sure this is the correct user - authorization
module.exports.ensureCorrectUser = (req, res, next) => {
	try {
		let token = req.headers.authorization.split(' ')[1];
		// decode the token
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			// if there is a user signed in
			// and is the same user in the URL
			if (decoded && decoded.id === req.params.id) {
				return next();
			}

			return next({
				status: 401,
				message: 'Unauthorized'
			});
		});
	} catch (error) {
		return next({
			status: 401,
			message: 'Unauthorized'
		});
	}
};
