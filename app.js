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
//app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/xml' }));
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
  extended: false
}));


const foundryRouter = require('./src/routes/foundryRoutes');
const redisClient = require('./src/services/redisClient');
const { dataBuilderRouter } = require('./src/routes/dataBuilderRoutes')(redisClient);

app.use('/pivot', foundryRouter);
app.use('/sessions', foundryRouter);
app.use('/cache', dataBuilderRouter);
app.route('/testdata').get(

  (req, res) => {
    debug('got request for redis cache');
    redisClient.get('testdata', function(error, result) {
          if (error) throw error;
          res.send(result);
        });

  }
);


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
    ],
  });

  // res.sendFile(path.join(__dirname, 'views', 'index.html'));

});




app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});