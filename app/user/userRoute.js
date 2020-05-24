const express = require('express');
const multer = require('multer');

const userController = require('./userController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

//routes
router.post('/update', upload.single('picture'), userController.updateUser);
router.post('/password', userController.updatePassword);

module.exports = router;