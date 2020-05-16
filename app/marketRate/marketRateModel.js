const mongoose = require('mongoose');

const marketRateSchema = mongoose.Schema({
    value: { type: String, required: true, unique: true },
    nameHi: { type: String, required: true, unique: true },
    nameEn: { type: String, required: true, unique: true },
    localRate: [Object],
    avgRate: { type: Number, required: true }
});

module.exports = mongoose.model('MarketRates', marketRateSchema);