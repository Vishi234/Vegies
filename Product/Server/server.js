var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
const jwt=require('jsonwebtoken');
app.use(bodyParser.json()); 
app.use(express.static(__dirname + 'public'));
var dbConfig=require("./config/dbConfig");
var vendor=require('./routes/vendor/vendorServer')
var adminCategory = require('./routes/adminCategory/adminCategory');
var configProducr=require('./routes/configProduct/configProduct')
const session=require('express-session')
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
console.log("portttttt",dbConfig.app.port);
//Setting up server
 var server = app.listen(process.env.PORT || dbConfig.app.port, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

app.use('/api/admin', adminCategory);
app.use('/api/configProduct', configProducr);

app.use(session({
    secret:'hgdg576esjhsd2236289hcskcb93e',
    saveUninitialized:true,
    resave:true
}))
app.use('/api/vendor', vendor);


