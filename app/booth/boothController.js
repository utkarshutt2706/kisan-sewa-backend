const boothService = require('./boothService');

const findNearBy = (req, resp, next) => {
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
    findNearBy,
};
