const Rent = require('./rentModel');

const setItemForRent = async () => {
    try {
        return 'set';
    } catch (error) {
        throw error;
    }
}

const getItemsForRent = async () => {
    try {
        return ['dummy product'];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    setItemForRent,
    getItemsForRent
}