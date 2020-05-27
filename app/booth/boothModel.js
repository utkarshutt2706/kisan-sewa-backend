const mongoose = require('mongoose');
const defaultValue = require('../config/default.json');

const boothSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    boothName: { type: String, required: true },
    address: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    picture: { type: String, required: true, default: defaultValue.profile },
});

module.exports = mongoose.model('Booth', boothSchema);
