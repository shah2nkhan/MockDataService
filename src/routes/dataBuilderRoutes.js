const debug = require('debug')('app:dataBuilderRoutes');
const express = require('express');

const dataBuilderRoutes = (client) =>
{
  const dataBuilderRouter = express.Router();
  const getRedisClient = client;

  dataBuilderRouter.post('/:key', (req, res) =>
  {
    debug(`got cache get ${ req.params.key}`);

    if (getRedisClient())
    {
      getRedisClient().set(req.params.key, req.body);
      res.send('ok');
    }
    res.send(500,"Internal server error : Redis Client not available");
  });

  dataBuilderRouter.get('/:key', (req, res) =>
  {
    debug(`got cache get ${ req.params.key}`);
    getRedisClient().get(req.params.key, function(error, result) {
            if (error) {res.send(500, error)};
            res.send(result);
          }); 

  });


  return { dataBuilderRouter };
};

module.exports = dataBuilderRoutes;
