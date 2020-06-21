const express = require('express');

const boothController = require('./boothController');

const router = express.Router();

//routes
router.get('/nearby', boothController.findNearBy);
router.put('/update', boothController.updateBooth);
router.put('/password', boothController.updatePassword);

module.exports = router;
