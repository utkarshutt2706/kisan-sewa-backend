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

const getUserById = (req, resp, next) => {
    userService
        .getUserById(req.params.id)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const followUser = (req, resp, next) => {
    userService
        .followUser(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const unFollowUser = (req, resp, next) => {
    userService
        .unFollowUser(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const reportUser = (req, resp, next) => {
    userService
        .reportUser(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

const unReportUser = (req, resp, next) => {
    userService
        .unReportUser(req.body)
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
    getUserById,
    followUser,
    unFollowUser,
    reportUser,
    unReportUser,
};
