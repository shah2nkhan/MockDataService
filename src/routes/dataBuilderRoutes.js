const debug = require('debug')('app:dataBuilderRoutes');
const express = require('express');

const dataBuilderRoutes = (client) =>
{
  const dataBuilderRouter = express.Router();
  const getRedisClient = client;

  dataBuilderRouter.post('/:key', (req, res) =>
  {
    debug(`got cache get ${ req.params.key}`);
    // res.writeHead(200);
    // res.write('ok');
    // res.end();
    if (getRedisClient())
    {getRedisClient().set(req.params.key, req.body);}
    res.send('ok');
  });

  dataBuilderRouter.get('/:key', (req, res) =>
  {
    debug(`got cache get ${ req.params.key}`);
    
      getRedisClient().get(req.params.key, function(error, result) {
            if (error) throw error;
            res.send(result);
          }); 

  });


  return { dataBuilderRouter };
};

module.exports = dataBuilderRoutes;
