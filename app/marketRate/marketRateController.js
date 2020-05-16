const marketRateService = require('./marketRateService');

const setMarketRate = (req, resp, next) => {
    marketRateService
        .setMarketRate(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const getMarketRate = (req, resp, next) => {
    marketRateService
        .getMarketRate(req.query)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    setMarketRate,
    getMarketRate
}
