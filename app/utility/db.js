const mongoose = require('mongoose');

const logger = require('./logger');
const date = require('./date');
const config = require('../config/development.json');

const dbConfig = config.dbConfig;
const mongoURI = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

const createConnection = () => {
    mongoose.connect(mongoURI, dbOptions)
        .then(() => {
            logger.info(`${date()}: Connection to DB established at URI: ${mongoURI}`);
        })
        .catch(() => {
            logger.error(`${date()}: Connection to DB failed`);
        });
}

module.exports = createConnection;