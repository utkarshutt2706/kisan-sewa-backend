const winston = require('winston');

const date = () => {
    return new Date(Date.now()).toDateString();
}

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `./logs/error-log/${date()}-error.log`, level: 'error' }),
        new winston.transports.File({ filename: `./logs/info-log/${date()}-info.log`, level: 'info' })
    ]
});

module.exports = logger;