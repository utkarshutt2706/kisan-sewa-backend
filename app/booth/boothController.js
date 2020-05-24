const boothService = require('./boothService');

const findNearBy = (req, resp, next) => {
    boothService
        .findNearByBooths(req.query)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const updateBooth = (req, resp, next) => {
    boothService
        .updateBooth(req.body, req.file)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const updatePassword = (req, resp, next) => {
    boothService
        .updatePassword(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    findNearBy,
    updateBooth,
    updatePassword,
};
