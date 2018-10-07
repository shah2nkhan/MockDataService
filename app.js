const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
var delay = require('express-delay');

const port = process.env.PORT || 12121;
const app = express();
const foundryRouter = require('./src/routes/foundryRoutes');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/pivot', foundryRouter);
app.use('/sessions', foundryRouter);

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
        link: './RatesDocStore',
        title: 'Rates Doc Store',
      },
    ],
  });

  // res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

