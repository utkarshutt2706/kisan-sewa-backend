const express = require('express');

const boothController = require('./boothController');

const router = express.Router();

//routes
router.get('/nearby', boothController.findNearBy);
router.post('/update', boothController.updateBooth);
router.post('/password', boothController.updatePassword);

module.exports = router;
