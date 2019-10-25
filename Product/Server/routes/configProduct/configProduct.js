var app = require('express').Router();
var model = require('./configProductModal');
var db = require("../../config/dbConfig");
var uniqid = require('uniqid');
const nodemailer = require("nodemailer");

module.exports = (function () {

    app.post("/saveList", function (req, res) {
        let configData = req.body;
        console.log("dataaconfig", configData)
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
                    model.cancelOrder.collection.update({ orderId: removeData }, { $set: { cancelDate: new Date() } }, { multi: true })
                }
            });
        })
        model.orderedCheckList.deleteMany({ orderId: removeData }, function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                res.status(201).json({ 'status': "Order has been Cancel successfully" });
            }
        });
    });


    app.post("/addList", function (req, res) {
        let configData = req.body;
        configData.orderId = req.body.orderId + 1;
        model.orderedCheckList.collection.insertMany(configData, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                sendMail(req, info => {
                    //model.register.updateOne({ email: userDetails.email }, { $set: { password:  model.register.hashPassword(password),loginAttemp:0 } }, (attempCount)=> {
                    res.status(201).json({ "status": "Order save successfully" });
                    //})
                }).catch(function (err) {
                    console.log("Mail Sending errors", err)
                });
                //res.status(201).json({ "status": "Order save successfully" });
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
            console.log("dtaaaa111", res1)
            res.send(res1);
        })
    });
    async function sendMail(user, callback) {
        user = (user.email) ? user : user.body;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'ajay14052019@gmail.com', // generated ethereal user
                pass: 'Testing@12' // generated ethereal password
            }
        });

        mailOptions = {
            from: '"SVJ Group"', // sender address
            to: user[0].email, // list of receivers
            subject: "New order Details", // Subject line
            //text: "Hello world?", // plain text body
            html: "<b>Email</b>: " + user[0].email + 
                "<br>Order Details-<br>"+JSON.stringify(user)
                // html body
        };
        let info = await transporter.sendMail(mailOptions);
        callback(info);
    }
    function generateDynamicTable(data) {
        let result = '<table>';
    for (let el in data) {
        result += "<tr><td>" + el + "</td><td>" + data[el] + "</td></tr>";
      }
      result += '</table>';
      console.log("tableeeeeeeeee",result)	
    }
    return app;

})();