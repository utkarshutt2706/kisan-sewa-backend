const express = require('express');

const marketRateController = require('./marketRateController');

const router = express.Router();

//routes
router.post('', marketRateController.setMarketRate);
router.get('', marketRateController.getMarketRate);

module.exports = router;