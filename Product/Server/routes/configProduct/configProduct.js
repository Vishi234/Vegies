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
        console.log("configList-----------", configData);
        model.configList.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to Collection");
            }
        });
    });

    app.get("/getList", function (req, res) {
        model.configList.find().then(res1 => {
            res.send(res1);
        })
    });


    // app.delete('/removeList/:id', function (req, res) {
    //     console.log("remove items-----------", req.params.id)
    //     model.configList.findByIdAndRemove(req.params.id)
    //         .then(note => {
    //             if (!note) {
    //                 return res.status(404).send({
    //                     message: "Note not found with id " + req.params.id
    //                 });
    //             }
    //             res.send({ message: "Note deleted successfully!" });
    //         }).catch(err => {
    //             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
    //                 return res.status(404).send({
    //                     message: "Note not found with id " + req.params.id
    //                 });
    //             }
    //             return res.status(500).send({
    //                 message: "Could not delete note with id " + req.params.id
    //             });
    //         });
    // });

    app.delete('/removeList/:id', function (req, res) {       
        var removeData=(req.params.id).split(',');
        model.configList.deleteMany({_id: removeData}, function (err, data) {
            if (err) {
                return console.log(err);
            }else{
                res.status(200).json({'Result':data.deletedCount});
            }
        });
    });

    app.post("/addList", function (req, res) {
        let configData = req.body;
        model.orderedCheckList.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                res.send("Multiple documents inserted to Collection");
            }
        });
    });

    app.get("/getOrderList", function (req, res) {
        model.orderedCheckList.find().then(res1 => {
            res.send(res1);
        })
    });

    return app;

})();