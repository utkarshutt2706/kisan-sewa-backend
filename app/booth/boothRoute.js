const express = require('express');

const boothController = require('./boothController');

const router = express.Router();

//routes
router.get('/nearby', boothController.findNearby);

module.exports = router;
