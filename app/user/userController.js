const userService = require('./userService');

const updateUser = (req, resp, next) => {
    userService
        .updateUser(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const updatePassword = (req, resp, next) => {
    userService
        .updatePassword(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    updateUser,
    updatePassword,
};
