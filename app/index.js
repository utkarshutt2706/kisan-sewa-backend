const express = require('express');
const cors = require('cors');
// const sgMail = require('@sendgrid/mail');

const logger = require('./utility/logger');
const date = require('./utility/date');
const createConnection = require('./utility/db');
const errorHandler = require('./utility/errorHandler');
const config = require('./config/development.json');
// const jwt = require('./utility/jwt');

// get connection to DB
createConnection();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
// app.use(jwt());

// routes
// app.get('/', (req, resp) => {
//     sgMail.setApiKey('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');
//     const msg = {
//         to: 'test@example.com',
//         from: 'test@example.com',
//         subject: 'Sending with Twilio SendGrid is Fun',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };
//     console.log('sending');
//     sgMail.send(msg);
//     console.log('Sent');
//     resp.send('Welcome to node');
// });

// global error handler
app.use(errorHandler);

// port number
const port = config.port;

app.listen(port, () => {
    logger.info(`${date()}: Server started on port number: ${port}.`)
});