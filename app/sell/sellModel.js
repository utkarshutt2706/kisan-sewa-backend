const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    soldBy: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    picture: {
        type: String,
        required: true,
        default: 'default/defaultProduct.jpg',
    }
});

module.exports = mongoose.model('ItemsForSale', sellSchema);
