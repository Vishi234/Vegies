var app = require('express').Router();
var model = require('./configProductModal');
var db = require("../../config/dbConfig");

module.exports = (function () {

    // function verifyToken(req,res,next){
    //     if(!req.headers.authorization){
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     let token=req.headers.authorization.split(' ')[1]
    //     if(token===null){
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     let payload=jwt.verifyToken(token,'secretKey')
    //     if(!payload){
    //         return res.status(401).send('Unauthorized request')
    //     }
    //     req.userId=payload.subject
    //     next();
    // }

    app.post("/saveList", function (req, res) {
       let configData = req.body;
        console.log("configList-----------",configData);
        model.configList.collection.insertMany(configData, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple documents inserted to Collection");
            }
          });
     });

     app.get("/getList", function (req, res) {
        model.configList.find().then(configList=>{
            console.log("getCategoryyyyyyy",configList)
            res.send(configList);
        })
    });
     return app;

})();