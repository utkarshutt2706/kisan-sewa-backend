const Sell = require('./sellModel');

const setItemForSale = async (bodyObj) => {
    try {
        const lang = bodyObj.lang;
        const sell = new Sell(bodyObj);
        await sell.save();
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

const getItemsForSale = async () => {
    try {
        const items = await Sell.find();
        return items;
    } catch (error) {
        throw error;
    }
};

const getItemById = async (id) => {
    try {
        const sell = await Sell.findById(id);
        return sell;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    setItemForSale,
    getItemsForSale,
    getItemById,
};
