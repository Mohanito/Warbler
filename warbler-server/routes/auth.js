const express = require('express');
const router = express.Router();
const { signup } = require('../handlers/auth');

// Associate the route with the handler
router.post('/signup', signup);

module.exports = router;
