const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	}
});

// pre hook
userSchema.pre('save', async function (next) {
	try {
		// if the password is not changed, continue next.
		if (!this.isModified('password')) {
			return next();
		}
		// 10 -> salt; bcrypt hash is async.
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		// when we pass an error to next, it goes to the error handler.
		return next(err);
	}
});

userSchema.method.comparePassword = async function (candidatePassword, next) {
	try {
		let isMatched = bcrypt.compare(candidatePassword, this.password);
		return isMatched;
	} catch (err) {
		// when we pass an error to next, it goes to the error handler.
		return next(err);
	}
};

// Use schema to create a Mongoose model
const User = mongoose.model('User', userSchema);

module.exports = User;
