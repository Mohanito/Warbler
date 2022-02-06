const db = require('../models/index');
const jwt = require('jsonwebtoken');
const errorHandler = require('./error');

const signin = async (req, res, next) => {
	try {
		// find a user
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username, profileImageUrl } = user;
		// check if password matches
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					id: id,
					username: username,
					profileImageUrl: profileImageUrl
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			});
		}
		// failed to match password
		return next({
			status: 400,
			message: 'Invalid Email/Password'
		});
	} catch (e) {
		// async failure
		return next({
			status: 400,
			message: 'Invalid Email/Password'
		});
	}
};

const signup = async (req, res, next) => {
	try {
		// create a user
		console.log(req.body);
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl } = user;
		let token = jwt.sign(
			{
				id: id,
				username: username,
				profileImageUrl: profileImageUrl
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	} catch (error) {
		// Mongoose validation fails
		if (error.code === 11000) {
			error.message = 'Sorry, username/email has been taken.';
		}
		return next({
			status: 400,
			message: error.message
		});
	}
};

module.exports = { signin, signup };
