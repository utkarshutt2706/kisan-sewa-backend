const express = require('express');

const userController = require('./userController');

const router = express.Router();

//routes
router.post('/update', userController.updateUser);
router.post('/password', userController.updatePassword);

module.exports = router;