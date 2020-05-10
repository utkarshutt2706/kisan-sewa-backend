const express = require('express');

const boothController = require('./boothController');

const router = express.Router();

//routes
router.post('/nearby', boothController.findNearBy);

module.exports = router;
