const newsletterService = require('./newsletterService');

const newsLetter = (req, resp, next) => {
    newsletterService
        .newsLetter(req.body)
        .then((data) => {
            resp.json(data);
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    newsLetter
};
