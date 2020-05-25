const express = require('express');
const multer = require('multer');

const rentController = require('./rentController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/sales');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('', upload.array('picture[]', 5), rentController.setItemForRent);
router.get('', rentController.getItemsForRent);

module.exports = router;