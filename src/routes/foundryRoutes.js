const express = require('express');

const foundryRouter = express.Router();

foundryRouter.route('/').get(
    (req, res) => {

        setTimeout(() => {
            res.send('hello foundry Pivot');
        }, 2000);
     //  res.send('hello foundry Pivot');
    }
  );
  
  foundryRouter.route('/data').get(
    (req, res) => {
      res.send('hello foundry Pivot data');
    }
  );

module.exports = foundryRouter;