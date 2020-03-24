const expressJwt = require('express-jwt');

const config = require('../config/development.json');
const userService = require('../user/userService');

const jwt = () => {
    const secret = config.secretKey;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // paths that dont require authentication
        ]
    });
}

const isRevoked = async (req, payload, done) => {
    const user = await userService.getUserById(payload.sub);
    req.payload = payload.sub;
    if (!user) {
        return done(null, true);
    }
    done();
};

module.exports = jwt;