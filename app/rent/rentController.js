const rentService = require('./rentService');

const setItemForRent = (req, resp, next) => {
    rentService
        .setItemForRent()
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const getItemsForRent = (req, resp, next) => {
    rentService
        .getItemsForRent()
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    setItemForRent,
    getItemsForRent
}
