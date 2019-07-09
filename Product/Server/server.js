var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
const jwt=require('jsonwebtoken');
app.use(bodyParser.json()); 
var dbConfig=require("./config/dbConfig");
var adminCategory = require('./routes/adminCategory/adminCategory');
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

 app.use('/api/admin', adminCategory);

