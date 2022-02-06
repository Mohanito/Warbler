// This file is responsible for the connection to a Mongo database.
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise; // use async keyword, return Promises

const mongoPassword = process.env.MONGO_PASSWORD;
const mongoUri = `mongodb+srv://Mohanito:${mongoPassword}@warblercluster.7gmbn.mongodb.net/Warbler?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
	keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
