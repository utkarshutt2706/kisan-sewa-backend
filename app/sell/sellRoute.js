const express = require('express');
const multer = require('multer');

const sellController = require('./sellController');

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

// routes
router.post('', upload.array('picture[]', 5), sellController.setItemForSale);
router.get('', sellController.getItemsForSale);

module.exports = router;
