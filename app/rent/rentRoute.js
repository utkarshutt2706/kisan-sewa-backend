const express = require('express');

const rentController = require('./rentController');

const router = express.Router();

router.post('', rentController.setItemForRent);
router.get('', rentController.getItemsForRent);

module.exports = router;