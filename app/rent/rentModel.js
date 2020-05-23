const mongoose = require('mongoose');

const rentSchema = mongoose.Schema({
    soldBy: { type: String, required: true },
    rate: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    picture: {
        type: String,
        required: true,
        default: 'default/defaultProduct.jpg',
    }
});

module.exports = mongoose.model('ItemsForRent', rentSchema);