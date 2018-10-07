const express = require('express');
const debug = require('debug')('app:foundryRoutes');
const fs = require("fs");
const path = require('path');

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
        const parentDir = path.dirname(module.parent.filename);
        debug(parentDir);
        fs.readFile(path.join(parentDir, 'response/foundryData.xml'), 'utf8', function (err, data) {
            if (err) throw err;
            res.send(data);
        }); 


    }
);

module.exports = foundryRouter;