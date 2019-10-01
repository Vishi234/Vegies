// var mssql = require("mssql"); 
// var connection= new mssql.ConnectionPool({
//     user:  'vegies',
//     password: 'y7s7%Jf0',
//     server: '198.15.117.109',
//     database:'Vegies'
// })
// module.exports = connection;
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const config = {
    app: {
      port: 8084
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'vegies'
    }
   };
 
   mongoose.set('useNewUrlParser', true);
   mongoose.set('useCreateIndex', true);
   const { db: { host, port, name } } = config;
   const connectionString = `mongodb://${host}:${port}/${name}`;
   //const connectionString =`mongodb://admin:admin@vegies-shard-00-00-lclv2.mongodb.net:27017,vegies-shard-00-01-lclv2.mongodb.net:27017,vegies-shard-00-02-lclv2.mongodb.net:27017/vegies?ssl=true&replicaSet=Vegies-shard-0&authSource=admin&retryWrites=true&w=majority`
   
   const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
   mongoose.connect(connectionString,options);
   module.exports = config;