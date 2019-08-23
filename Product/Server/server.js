var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
const jwt=require('jsonwebtoken');

app.use(express.static('uploads'));
var passport=require('passport')
var session=require('express-session');
app.use(bodyParser.json()); 
var cors=require('cors');

//CORS Middleware
app.use(cors({credentials: true, origin: 'http://192.168.0.102:4200'}));
var dbConfig=require("./config/dbConfig");
var vendor=require('./routes/vendor/vendorServer')
var adminCategory = require('./routes/adminCategory/adminCategory');
var configProduct=require('./routes/configProduct/configProduct')
// app.use(cors({
//     origin:['http://localhost:4200'],
//     credentials:true
// }))
app.use('/api/admin', adminCategory);
app.use('/api/configProduct', configProduct);

app.use(session({
    name:'hello',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
    }
}))
require('./config/paaport-config')
app.use(passport.initialize());
app.use(passport.session());

//const session=require('express-session')
//app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));
//app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true,cookie: { path: '/', httpOnly: true, maxAge: 30 * 30000 },rolling: true}));
app.use('/api/vendor', vendor);

//Setting up server
var server = app.listen(process.env.PORT || dbConfig.app.port, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });


