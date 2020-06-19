const express = require('express');

const sellController = require('./sellController');

const router = express.Router();

// routes
router.post('', sellController.setItemForSale);
router.get('', sellController.getItemsForSale);
router.get(':id', sellController.getItemById);

module.exports = router;
