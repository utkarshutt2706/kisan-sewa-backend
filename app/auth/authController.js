const authService = require('./authService');

const register = (req, resp, next) => {
    authService
        .register(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const login = (req, resp, next) => {
    authService
        .login(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const forgotPassword = (req, resp, next) => {
    authService
        .forgotPassword(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const resetPassword = (req, resp, next) => {
    authService
        .resetPassword(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};
