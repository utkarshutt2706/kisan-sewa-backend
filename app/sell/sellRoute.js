const express = require('express');

const sellController = require('./sellController');

const router = express.Router();

router.get('', sellController.getItemsForSale);
router.post('', sellController.setItemForSale);

module.exports = router;
