//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
var dbConfig=require("./config/dbConfig")
console.log("dbcongig",dbConfig.user)
//const User=require("./user");
//let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/register');
const jwt=require('jsonwebtoken');
//var db = mongoose.connection;

// Body Parser Middleware
app.use(bodyParser.json()); 

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

 

//Initiallising connection string
var dbConfig = {
    user:  'vegies',
    password: 'y7s7%Jf0',
    server: '198.15.117.109',
    database:'Vegies'
};

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

// app.post("/api/user",function (req, res) {  
//    dbConfig.connect().then(function () {  
//        var transaction = new sql.Transaction(dbConfig);  
//        transaction.begin().then(function () {  
//            var request = new sql.Request(transaction);  
//            request.input("YEAR_ID", sql.VarChar(50), req.body.YEAR_ID)  
//            request.input("CUSTOMER_ID", sql.Decimal(18, 0), req.body.CUSTOMER_ID)  
//            request.input("USER_ID", sql.VarChar(18, 0), req.body.USER_ID)  
//            request.input("YEAR", sql.VarChar(18, 0), req.body.YEAR)  
//            request.input("START_DATE", sql.VarChar(18, 0), req.body.START_DATE)  
//            request.input("END_DATE", sql.VarChar(18, 0), req.body.END_DATE)  
//            request.input("IS_ACTIVE", sql.VarChar(18, 0), req.body.IS_ACTIVE)  
//            request.input("OPER_TYPE", sql.VarChar(18, 0), req.body.OPER_TYPE)  
//            request.input("REPORT_ID", sql.Decimal(18, 0), req.body.REPORT_ID)  

//           // request.input("FLAG", sql.VarChar(18, 0), req.body.ProductPrice)  
//           // request.input("MSG", sql.VarChar(18, 0), req.body.ProductPrice)  
//            request.execute("SP_ACADEMIC_YEAR").then(function () {  
//                transaction.commit().then(function (recordSet) {  
//                    conn.close();  
//                    res.status(200).send(req.body);  
//                }).catch(function (err) {  
//                    conn.close();  
//                    res.status(400).send("Error while inserting data");  
//                });  
//            }).catch(function (err) {  
//                conn.close();  
//                res.status(400).send("Error while inserting data");  
//            });  
//        }).catch(function (err) {  
//            conn.close();  
//            res.status(400).send("Error while inserting data");  
//        });  
//    }).catch(function (err) {  
//        conn.close();  
//        res.status(400).send("Error while inserting data");  
//    });  
// });  
// app.post("/api/user", function(req , res){
// console.log(req.body);
// res.status(200).send({"message":"Data Recieved"});
// });
// app.post("/api/resgister",function(req,res){
//    console.log("hiiiiiiiiii");
//    let userData=req.body;
//    let user=new User(userData)
//    user.save((error,registerUser)=>{
//       if(error){
//          console.error("error");
//       }else{
//          let payload={subject:registerUser._id}
//          let token=jwt.sign(payload,'secretKey')
//          res.status(200).send({token});
//       }
//    })
// })

// app.post("/api/login",function(req,res){
//    let userData=req.body;
//    User.findOne({email:userData.email},(error,user)=>{
//       if(error){
//          console.log(error);
//       }else{
//          if(!user){
//             res.status(401).send('Invalid email');
//          }else{
//             if(user.password!=userData.password){
//                res.status(401).send("Invalid Password")
//             }else{
//                let payload={subject:user._id}
//                let token=jwt.sign(payload,'secretKey')
//                res.status(200).send({token});
//             }
//          }
//       }
//    })
// })

// //POST API
//  app.post("/api/user", function(req , res){
//                 var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password�);
//                 executeQuery (res, query);
// });

// //PUT API
//  app.put("/api/user/:id", function(req , res){
//                 var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//                 executeQuery (res, query);
// });

// // DELETE API
//  app.delete("/api/user /:id", function(req , res){
//                 var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//                 executeQuery (res, query);
// });