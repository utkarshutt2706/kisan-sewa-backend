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
            `https://weather-ydn-yql.media.yahoo.com/forecastrss?lat=${req.query.lat}&lon=${req.query.lon}&u=c&format=json`,
            null,
            null,
            (error, data, result) => {
                if (error) {
                    console.log('//////error');
                    console.log(error);
                    resp.status(400).json({});
                } else {
                    console.log('Success weather data returned');
                    resp.json(data);
                }
            }
        );
    } catch (error) {
        console.log('----- catch');
        console.log(error);
        next(error);
    }
};

module.exports = {
    weather,
};
