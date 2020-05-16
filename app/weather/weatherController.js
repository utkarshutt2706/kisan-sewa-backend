const oAuth = require('oauth');
const config = require('../config/development.json');

const weather = (req, resp, next) => {
    try {
        const header = {
            'X-Yahoo-App-Id': config.weather.appId,
        };
        const request = new oAuth.OAuth(
            null,
            null,
            config.weather.consumerKey,
            config.weather.consumerSecret,
            '1.0',
            null,
            'HMAC-SHA1',
            null,
            header
        );
        request.get(
            `https://weather-ydn-yql.media.yahoo.com/forecastrss?lat=${req.body.lat}&lon=${req.body.lon}&u=c&format=json`,
            null,
            null,
            (error, data, result) => {
                if (error) {
                    throw error;
                } else {
                    resp.json(data);
                }
            }
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    weather,
};
