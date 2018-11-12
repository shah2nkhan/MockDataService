const debug = require('debug')('app:redisClient');
const fs = require('fs');
const path = require('path');
const redis = require('redis');

const config = {
  host: '127.0.0.1',
  port: 6380,
};

const client = redis.createClient(config);
client.on('error', (err) => {
  // setTimeout(()=>{
  //     client=redis.createClient();}
  //     , 1000);
  debug('Something went wrong in redis ', err);
});

const parentDir = path.dirname(module.parent.filename);
fs.readFile(path.join(parentDir, 'response', 'test.xml'), 'utf8', (err, contents) => {
  if (err) {
    debug(err);
    throw err;
  }
  debug('writing to redis ' + contents.slice(0, 20));
  if (client)
    {client.set('testdata', contents,redis.print);}
});

module.exports = client;
