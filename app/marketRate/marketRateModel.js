const mongoose = require('mongoose');

const marketRateSchema = mongoose.Schema({
    value: { type: String, required: true, unique: true },
    nameHi: { type: String, required: true, unique: ture },
    nameEn: { type: String, required: true, unique: true },
    localRate: [Object],
    avgRate: { type: Number, required: true }
});

module.exports = mongoose.model('MarkerRates', marketRateSchema);