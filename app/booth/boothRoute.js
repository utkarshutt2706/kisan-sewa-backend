const express = require('express');
const multer = require('multer');

const boothController = require('./boothController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/booths');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

//routes
router.get('/nearby', boothController.findNearBy);
router.post('/update', upload.single('picture'), boothController.updateBooth);

module.exports = router;
