const express = require('express');

const userController = require('./userController');

const router = express.Router();

//routes
router.put('/update', userController.updateUser);
router.put('/password', userController.updatePassword);

module.exports = router;