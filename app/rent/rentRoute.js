const express = require('express');

const rentController = require('./rentController');

const router = express.Router();

router.get('', rentController.getItemsForRent);
router.post('', rentController.setItemForRent);

module.exports = router;