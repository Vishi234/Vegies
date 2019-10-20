var app = require('express').Router();
var model = require('./configProductModal');
var db = require("../../config/dbConfig");
var uniqid = require('uniqid');

module.exports = (function () {

    app.post("/saveList", function (req, res) {
        let configData = req.body;
        model.configList.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                res.status(201).json({ status: "Successfully configure your list." })
                //console.log("Multiple documents inserted to Collection");
            }
        });
    });

    app.get("/getList", function (req, res) {
        let userDetails = req.query;
        model.configList.find({ userName: userDetails.userId }).then(res1 => {
            //console.log("outputttttttttttt",res1)
            res.send(res1);
        })
    });

    app.delete('/removeList/:id', function (req, res) {
        var removeData = (req.params.id).split(',');
        model.configList.deleteMany({ _id: removeData }, function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                res.status(201).json({ 'status': data.deletedCount + " records deleted from your checklist" });
            }
        });
    });

    app.delete('/cancelOrderList/:orderId', function (req, res) {
        var removeData = req.params.orderId
        model.orderedCheckList.find({ orderId: removeData }).then(res1 => {    
            model.cancelOrder.collection.insertMany(res1, function (err, docs) {
                if (err) {
                    return console.error(err);
                } else {
                    model.cancelOrder.collection.update({orderId:removeData}, {$set: {cancelDate: new Date()}}, {multi: true})
                }
            });
        })
        model.orderedCheckList.deleteMany({ orderId: removeData }, function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                res.status(201).json({ 'status':"Order has been Cancel successfully" });
            }
        });
    });


    app.post("/addList", function (req, res) {
        let configData = req.body;
        configData.orderId = req.body.orderId + 1;
        //console.log("configData",configData)
        model.orderedCheckList.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                res.status(201).json({ "status": "Order save successfully" });
            }
        });
    });

    app.get("/getOrder", function (req, res) {
        let userDetails = req.query;
        model.orderedCheckList.find({ userName: userDetails.userId }).then(res1 => {
            res.send(res1);
        })
    });

    app.get("/getCancelOrder", function (req, res) {
        let userDetails = req.query;
        model.cancelOrder.find({ userName: userDetails.userId }).then(res1 => {
            res.send(res1);
        })
    });

    app.post("/setScheduler", function (req, res) {
        let configData = req.body;
        console.log("setSchedulersetScheduler", configData)
        model.setScheduler.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                res.status(201).json({ "status": "Products are schedule successfully" });
            }
        });
    });

    app.get("/getOrderList", function (req, res) {
        model.orderedCheckList.find().then(res1 => {
            res.send(res1);
        })
    });

    app.get("/getScheduleList", function (req, res) {
        let userDetails = req.query;
        model.setScheduler.find({ userName: userDetails.userId }).then(res1 => {
            res.send(res1);
        })
    });

    app.post("/addAddress", function (req, res) {
        console.log("uuuuuuuuuoooooooooo")
        let configData = req.body;
        console.log("setaddresssetaddress", configData)
        model.setAddress.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                res.status(201).json({ "status": "Address added successfully" });
            }
        });
    });

    app.get("/getAddress", function (req, res) {
        let userDetails = req.query;
        model.setAddress.find({ userId: userDetails.userId }).then(res1 => {
            res.send(res1);
        })
    });


    return app;

})();