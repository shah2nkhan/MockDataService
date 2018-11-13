const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const port = process.env.PORT || 12121;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(compression());
// bodyParser = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true},
//   text:{limit:'50mb', extended: true}
// };
//app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/xml',limit: '50mb' , extended: true}));
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({
  limit:'50mb',
  extended: false
}));

const redisConfig = {
  host: process.env.REDISHOST ||'127.0.0.1',
  port: process.env.REDISPORT || 6380,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
    }
    if (options.attempt > 100000) {
        // End reconnecting with built in error
        return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 1000, 3000);
}
};


const dataFolderPath =  path.join(__dirname,'response');
const foundryRouter = require('./src/routes/foundryRoutes');
const { client } = require('./src/services/redisClient')(redisConfig, dataFolderPath);
const { dataBuilderRouter } = require('./src/routes/dataBuilderRoutes')(client);

app.use('/pivot', foundryRouter);
app.use('/sessions', foundryRouter);
app.use('/cache', dataBuilderRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mock service',
    nav: [{
        link: './pivot',
        title: 'Foundry',
      },
      {
        link: './RatesService',
        title: 'Rates Service',
      },
      {
        link: './RatesDoc',
        title: 'Rates Doc Store',
      },
      {
        link: './Cache',
        title: 'Cache',
      },
    ],
  });

  // res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});