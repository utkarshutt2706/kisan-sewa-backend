const Sell = require('./sellModel');

const setItemForSale = async (bodyObj, fileList) => {
    try {
        const lang = bodyObj.lang;
        const sell = new Sell(bodyObj);
        for (let i = 0; i < fileList.length; i++) {
            const element = fileList[i];
            switch (i) {
                case 0:
                    sell.picture0 = `sales/${element.filename}`;
                    break;
                case 1:
                    sell.picture1 = `sales/${element.filename}`;
                    break;
                case 2:
                    sell.picture2 = `sales/${element.filename}`;
                    break;
                case 3:
                    sell.picture3 = `sales/${element.filename}`;
                    break;
                case 4:
                    sell.picture4 = `sales/${element.filename}`;
                default:
                    break;
            }
        }
        await sell.save();
        if (lang === 'hi') {
            return {
                message: 'आपका उत्पाद हमारे डेटा में जोड़ दिया गया है',
                detail: 'हम जल्द ही आपको एक ग्राहक ढूंढेंगे और आपको सूचित करेंगे।'
            };
        } else {
            return {
                message: 'Your product has been added to our data',
                detail: 'We will soon find you a customer and notify you.'
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

module.exports = {
    setItemForSale,
    getItemsForSale,
};
