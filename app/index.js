const express = require('express');
const cors = require('cors');
// const sgMail = require('@sendgrid/mail');

const logger = require('./utility/logger');
const date = require('./utility/date');
const createConnection = require('./utility/db');
const errorHandler = require('./utility/errorHandler');
const config = require('./config/development.json');

const authRoute = require('./auth/authRoute');
const boothRoute = require('./booth/boothRoute');

// const jwt = require('./utility/jwt');

// get connection to DB
createConnection();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
// app.use(jwt());

app.use('/auth', authRoute);
app.use('/booth', boothRoute);

// global error handler
app.use(errorHandler);

// port number
const port = config.port;

app.listen(port, () => {
    logger.info(`${date()}: Server started on port number: ${port}.`);
});
