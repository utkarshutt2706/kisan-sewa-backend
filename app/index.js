const express = require('express');
const cors = require('cors');

const logger = require('./utility/logger');
const date = require('./utility/date');
const createConnection = require('./utility/db');
const errorHandler = require('./utility/errorHandler');
const config = require('./config/development.json');

const authRoute = require('./auth/authRoute');
const boothRoute = require('./booth/boothRoute');
const marketRateRoute = require('./marketRate/marketRateRoute');

const newsletter = require('./newsletter/newsletterController');
const weather = require('./weather/weatherController');

// get connection to DB
createConnection();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, resp) => {
    resp.writeHead(301, {'Location': 'https://kisan-sewa.herokuapp.com/'});
    resp.end();
})
app.use('/auth', authRoute);
app.use('/booth', boothRoute);
app.use('market-rate', marketRateRoute);
app.post('/newsletter', newsletter.newsLetter);
app.post('/weather', weather.weather);

// global error handler
app.use(errorHandler);

// port number
const port = process.env.PORT || config.port;

app.listen(port, () => {
    // logger.info(`${date()}: Server started on port number: ${port}.`);
    console.log(`Server started at port number: ${port}`);
});
