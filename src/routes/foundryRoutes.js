const express = require('express');
const debug = require('debug')('app:foundryRoutes');
const fs = require('fs');
const path = require('path');
const foundryRouter = express.Router();
const zlib = require('zlib');

const gzip = zlib.createGzip();
foundryRouter.route('/data').get(

    (req, res) => {
        const parentDir = path.dirname(module.parent.filename);
        debug(parentDir);
        fs.createReadStream(path.join(parentDir, 'response', 'foundryData.xml'))
            .pipe(gzip)
            .pipe(res).on('finish', function () { // finished
                debug('done compressing');
            });

        // fs.readFile(, 'utf8', (err, data) => {
        //     if (err) throw err;
        //     res.send(data);
        // });
        //   res.send(`hello foundry Pivot ${parentDir}`);

    }
);


foundryRouter.route('/').get(
    (req, res) => {
        setTimeout(() => {
            res.send('hello foundry Pivot');
        }, 2000);
        //  res.send('hello foundry Pivot');
    }
);


module.exports = foundryRouter;