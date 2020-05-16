const MarketRates = require('./marketRateModel');

const setMarketRate = async (param) => {
    try {
        
    } catch (error) {
        throw error;
    }
};

const getMarketRate = async (param) => {
    try {
        return [
            {
                nameEn: 'Tomato',
                nameHi: 'टमाटर',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Potato',
                nameHi: 'आलू',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Onion',
                nameHi: 'प्याज',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Wheat',
                nameHi: 'गेहूँ',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Rice',
                nameHi: 'चावल',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Cucumber',
                nameHi: 'खीरा',
                localRate: 30,
                avgRate: 40
            },
            {
                nameEn: 'Cabbage',
                nameHi: 'पत्ता गोभी',
                localRate: 30,
                avgRate: 40
            }
        ];
    } catch (error) {
        throw error;
    }
};

module.exports ={
    setMarketRate,
    getMarketRate
}
