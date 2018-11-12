const debug = require('debug')('app:dataBuilderRoutes');
const express = require('express');

const dataBuilderRoutes = (client) =>
{
  const dataBuilderRouter = express.Router();
  const redisClient = client;

  dataBuilderRouter.post('/testdata', (req, res) =>
  {
    debug(`got post${  req.body}`);
    // res.writeHead(200);
    // res.write('ok');
    // res.end();

    res.send('ok');
  });
  return { dataBuilderRouter };
};

module.exports = dataBuilderRoutes;
