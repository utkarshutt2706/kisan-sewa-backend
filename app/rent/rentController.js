const rentService = require('./rentService');

const setItemForRent = (req, resp, next) => {
    rentService
        .setItemForRent(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const getItemsForRent = (req, resp, next) => {
    rentService
        .getItemsForRent(req.query)
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
