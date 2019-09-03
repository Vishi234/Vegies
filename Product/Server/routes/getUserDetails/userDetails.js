var db = require("../../config/dbConfig");
var express = require('express');
var model=require('../vendor/vendorModel');
var app = express();

var router = express.Router();

router.get("/getVendorDetails", function (req, res) {
    let userDetails = req.query;
    model.register.find().then(res1 => {
       res.send(res1);
    })
});

router.post("/updateOrderStatus", function (req, res) {
    let userDetails = req.query;
    console.log("oooooooooo",req.query)

    // model.register.updateOne({ status: userDetails.email }, { $set: { password:  model.register.hashPassword(password),loginAttemp:0 } }, (attempCount)=> {
    //     res.status(200).json({ successMsg:'Mail has been send successfully.'});
    //   })

    // model.register.find().then(res1 => {
    //    res.send(res1);
    // })
});


module.exports = router;