const mongoose = require('mongoose');
const defaultValue = require('../config/default.json');

const rentSchema = mongoose.Schema({
    soldBy: { type: String, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    unit: { type: String, required: true },
    quantity: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    addedOn: { type: Date, required: true, default: Date.now() },
    picture1: { type: String },
    picture2: { type: String },
    picture3: { type: String },
    picture4: { type: String },
    picture0: {
        type: String,
        required: true,
        default: defaultValue.product,
    },
});

module.exports = mongoose.model('Rent', rentSchema);
