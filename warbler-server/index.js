// load environment variables
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// prefix /signup with /api/auth
app.use('/api/auth', authRoutes);

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
