// load environment variables
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// prefix /signup, /signin with /api/auth
app.use('/api/auth', authRoutes);

// insert middlewares before messagesRoutes
app.use(
	'/api/users/:id/messages',
	loginRequired,
	ensureCorrectUser,
	messagesRoutes
);

// messages display
app.use('/api/messages', loginRequired, async (req, res, next) => {
	try {
		// find all messages, sort by create time, get user info
		let messages = db.Message.find()
			.sort({ createdAt: 'desc' })
			.populate('user', {
				username: true,
				profileImageUrl: true
			});
		return res.status(200).json(messages);
	} catch (error) {
		return next(error);
	}
});

// next -> move to the next piece of middleware
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
