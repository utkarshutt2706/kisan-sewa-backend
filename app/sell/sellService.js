const Sell = require('./sellModel');

const setItemForSale = async () => {
    try {
        return 'set';
    } catch (error) {
        throw error;
    }
};

const getItemsForSale = async () => {
    try {
        return [];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    setItemForSale,
    getItemsForSale,
};
