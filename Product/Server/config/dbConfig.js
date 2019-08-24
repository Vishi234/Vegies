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
    port: 8080
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
mongoose.connect(connectionString);
module.exports = config;