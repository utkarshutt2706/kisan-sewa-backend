const express = require('express');

const rentController = require('./rentController');

const router = express.Router();

router.post('', rentController.setItemForRent);
router.get('', rentController.getItemsForRent);
router.get(':id', rentController.getItemById);

module.exports = router;