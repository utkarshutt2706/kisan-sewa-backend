const express = require('express');
const cors = require('cors');

const createConnection = require('./utility/db');
const errorHandler = require('./utility/errorHandler');
const config = require('./config/development.json');

const authRoute = require('./auth/authRoute');
const boothRoute = require('./booth/boothRoute');
const userRoute = require('./user/userRoute');
const marketRateRoute = require('./marketRate/marketRateRoute');
const sellRoute = require('./sell/sellRoute');
const rentRoute = require('./rent/rentRoute');

const newsletter = require('./newsletter/newsletterController');
const weather = require('./weather/weatherController');

const app = express();

// middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.static('public'));

app.get('/', (req, resp) => {
    resp.writeHead(301, { Location: 'https://kisan-sewa.herokuapp.com/' });
    resp.end();
});

app.use('/auth', authRoute);
app.use('/booth', boothRoute);
app.use('/user', userRoute);
app.use('/market-rate', marketRateRoute);
app.use('/sell', sellRoute);
app.use('/rent', rentRoute);

app.post('/newsletter', newsletter.newsLetter);
app.get('/weather', weather.weather);

// global error handler
app.use(errorHandler);

// port number
const port = process.env.PORT || config.port;

app.listen(port, async () => {
    // logger.info(`${date()}: Server started on port number: ${port}.`);
    await createConnection();
    console.log(`Server started at port number: ${port}`);
});
