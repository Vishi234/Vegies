var mssql = require("mssql"); 
var connection= new mssql.ConnectionPool({
    user:  'vegies',
    password: 'y7s7%Jf0',
    server: '198.15.117.109',
    
    database:'Vegies'
})

module.exports = connection;