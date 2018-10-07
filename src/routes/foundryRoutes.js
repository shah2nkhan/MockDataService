const express = require('express');
const debug = require('debug')('app:foundryRoutes');
const fs = require("fs");

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
        (async function sendResponse() {
            res.writeHead(200, {
                'Content-Type': 'text/xml',
                'Transfer-Encoding': 'chunked'
              })
            fs.createReadStream("../response/foundryData.xml").pipe(res);
            res.end();
            
        }());

    }
);

module.exports = foundryRouter;