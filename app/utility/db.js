const mongoose = require('mongoose');

const logger = require('./logger');
const date = require('./date');
const config = require('../config/development.json');

const dbConfig = config.dbConfig;
const mongoURI =  `mongodb+srv://${dbConfig.host}:${dbConfig.password}@${dbConfig.dbName}-aeb6j.mongodb.net/${dbConfig.dbName}?retryWrites=true&w=majority`;

const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

const createConnection = async () => {
    await mongoose.connect(mongoURI, dbOptions)
        .then(() => {
            // logger.info(`${date()}: Connection to DB established at URI: ${mongoURI}`);
            console.log('DB Connected');
        })
        .catch((error) => {
            // logger.error(`${date()}: Connection to DB failed`);
            console.log('DB Connection Failed');
            console.log(error);
        });
}

module.exports = createConnection;