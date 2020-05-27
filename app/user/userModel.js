const mongoose = require('mongoose');
const defaultValue = require('../config/default.json');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    picture: { type: String, required: true, default: defaultValue.profile },
});

module.exports = mongoose.model('User', userSchema);
