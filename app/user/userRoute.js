const express = require('express');

const userController = require('./userController');

const router = express.Router();

//routes
router.put('/update', userController.updateUser);
router.put('/password', userController.updatePassword);
router.get('/:id', userController.getUserById);
router.put('/follow', userController.followUser);
router.put('/un-follow', userController.unFollowUser);
router.put('/report', userController.reportUser);
router.put('/un-report', userController.unReportUser);

module.exports = router;