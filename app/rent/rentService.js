const Rent = require('./rentModel');

const setItemForRent = async (bodyObj) => {
    try {
        const lang = bodyObj.lang;
        const rent = new Rent(bodyObj);
        await rent.save();
        if (lang === 'hi') {
            return {
                message: 'आपका उत्पाद हमारे डेटा में जोड़ दिया गया है',
                detail:
                    'हम जल्द ही आपको एक ग्राहक ढूंढेंगे और आपको सूचित करेंगे।',
            };
        } else {
            return {
                message: 'Your product has been added to our data',
                detail: 'We will soon find you a customer and notify you.',
            };
        }
    } catch (error) {
        throw error;
    }
};

const getItemsForRent = async () => {
    try {
        const items = await Rent.find();
        return items;
    } catch (error) {
        throw error;
    }
};

const getItemById = async (id) => {
    try {
        const rent = await Rent.findById(id);
        return rent;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    setItemForRent,
    getItemsForRent,
    getItemById,
};
