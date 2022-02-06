const express = require('express');
const router = express.Router({ mergeParams: true });

const {
	createMessage,
	getMessage,
	deleteMessage
} = require('../handlers/messages');

// prefix = /api/users/:id/messages
router.post('/', createMessage);

router.get('/:message_id', getMessage);
router.delete('/:message_id', deleteMessage);

module.exports = router;
