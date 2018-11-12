const debug = require('debug')('app:redisClient');
const fs = require('fs');
const path = require('path');
const redis = require('redis');




const dataClientProvider = (config,dataPath)=>
{


var client = redis.createClient(config );
client.on('error', (err) => {
  setTimeout(()=>{
      client=redis.createClient();}
      , 1000);
  debug('Something went wrong in redis ', err);
});

const parentDir =  dataPath; // path.dirname(module.parent.filename);
fs.readFile(path.join(parentDir, 'test.xml'), 'utf8', (err, contents) => {
  if (err) {
    debug(err);
    throw err;
  }
  debug('writing to redis ' + contents.slice(0, 20));
  if (getClient())
    {getClient().set('testdata', contents,redis.print);}
});

const getClient= ()=>{
    return client;
}
 return { client: getClient};

}
module.exports = dataClientProvider;
