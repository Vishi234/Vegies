var db = require("../../config/dbConfig");
var express = require('express');
var model=require('../vendor/vendorModel');
var app = express();

var router = express.Router();

router.get("/getVendorDetails", function (req, res) {
    let userDetails = req.query;
    model.register.find().then(res1 => {
        console.log("outputttttttttttt",res1)
       res.send(res1);
    })
});

module.exports = router;