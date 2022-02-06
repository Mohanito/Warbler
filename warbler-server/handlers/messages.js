const db = require('../models');

// /api/users/:id/messages
module.exports.createMessage = async (req, res, next) => {
	try {
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		// bound the message to the user
		let user = await db.User.findById(req.params.id);
		console.log(message._id);
		user.messages.push(message._id);
		await user.save();
		// send back additional information about the user
		// for displaying messages without doing another db query
		let foundMessage = await db.Message.findById(message._id).populate(
			'user',
			{
				username: true,
				profileImageUrl: true
			}
		);
		return res.status(200).json(foundMessage);
	} catch (error) {
		return next(error);
	}
};

// /api/users/:id/messages/:message_id
module.exports.getMessage = async (req, res, next) => {
	try {
		let message = await db.Message.find(req.params.message_id);
		return res.status(200).json(message);
	} catch (error) {
		return next(error);
	}
};

module.exports.deleteMessage = async (req, res, next) => {
	try {
		let message = await db.Message.find(req.params.message_id);
		await message.remove();
		return res.status(200).json(message);
	} catch (error) {
		return next(error);
	}
};
