var db = require("../../config/dbConfig");
var express = require('express');
var model=require('../configProduct/configProductModal');
var app = express();

var router = express.Router();

router.get("/getVendorDetails", function (req, res) {
    let userDetails = req.query;
    model.register.find().then(res1 => {
       res.send(res1);
    })
});

router.post("/updateOrderStatus", function (req, res) {
    let userDetails = req.body;
    console.log("oooooooooo",userDetails)

    var conditions = { orderId: userDetails.orderId }
  , update = { $set: { status:userDetails.status } }
  , options = { multi: true };
    model.orderedCheckList.update(conditions, update,options, (err,attempCount)=> {      
        res.status(200).json({ successMsg:'Order status updated successfully.'});
      })
});


module.exports = router;