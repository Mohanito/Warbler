const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 128
		},
		// make a reference to the user
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

messageSchema.pre('remove', async (next) => {
	try {
		// find the author
		let user = await User.findById(this.user);
		// remove the message from the user
		user.messages.remove(this.id);
		// save the user
		await user.save();
		return next();
	} catch (error) {
		return next(error);
	}
});

// Use schema to create a Mongoose model
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
