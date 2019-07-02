var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
const jwt=require('jsonwebtoken');
app.use(bodyParser.json()); 
var dbConfig=require("./config/dbConfig");
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

var adminCategory = require('./routes/adminCategory/adminCategory');
app.use('/api/admin', adminCategory);


// //Function to connect to database and execute query
// var  executeQuery = function(res, query){             
//      sql.connect(dbConfig, function (err) {
//          if (err) {   
//                      console.log("Error while connecting database :- " + err);
//                      res.send(err);
//                   }
//                   else {
//                          // create Request object
//                          var request = new sql.Request();
//                          // query to the database
//                          request.query(query, function (err, res1) {
//                            if (err) {
//                                       console.log("Error while querying database :- " + err);
//                                       res.send(err);
//                                      }
//                                      else {
//                                         console.log("hhhhhhhhhhhhhhhh");
//                                        res.send(res1);
//                                        sql.close()
//                                             }
//                                });
//                        }
//       });           
// }

// //GET APIs
// app.get("/api/user", function(req , res){
//                 var query = "select * from mst_course";
//                 executeQuery (res, query);
// });

