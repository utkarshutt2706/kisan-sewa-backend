const boothService = require('./boothService');

const findNearby = (req, resp, next) => {
    boothService
        .findNearByBooths(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    findNearby,
};
