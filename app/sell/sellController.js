const sellService = require('./sellService');

const setItemForSale = (req, resp, next) => {
    sellService
        .setItemForSale(req.body, req.files)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const getItemsForSale = (req, resp, next) => {
    sellService
        .getItemsForSale(req.query)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    setItemForSale,
    getItemsForSale,
};
