const Rent = require('./rentModel');

const setItemForRent = async (bodyObj, fileList) => {
    try {
        const lang = bodyObj.lang;
        const rent = new Rent(bodyObj);
        for (let i = 0; i < fileList.length; i++) {
            const element = fileList[i];
            switch (i) {
                case 0:
                    rent.picture0 = `rents/${element.filename}`;
                    break;
                case 1:
                    rent.picture1 = `rents/${element.filename}`;
                    break;
                case 2:
                    rent.picture2 = `rents/${element.filename}`;
                    break;
                case 3:
                    rent.picture3 = `rents/${element.filename}`;
                    break;
                case 4:
                    rent.picture4 = `rents/${element.filename}`;
                default:
                    break;
            }
        }
        await rent.save();
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
}

const getItemsForRent = async () => {
    try {
        const items = await Rent.find();
        return items;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    setItemForRent,
    getItemsForRent
}