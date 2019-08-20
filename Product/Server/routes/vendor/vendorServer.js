var db = require("../../config/dbConfig");
const nodemailer = require("nodemailer");
var generator = require('generate-password');
var model = require("./vendorModel");
const jwt = require("jsonwebtoken");
var express = require('express');
var app = express();
var passport=require('passport')
isValidUser=require('../../config/paaport-config');

// app.use(session({
//     secret:'hgdg576esjhsd2236289hcskcb93e',
//     saveUninitialized:false,
//     resave:false
// }))
var router = express.Router();
var mailOptions, host;


//module.exports = (function () {
'use strict';
var rand, host, link;
var password = generator.generate({
    length: 10,
    numbers: true,
    //symbols: true
});

// var app = require('express').Router();

router.post("/registration", function (req, res,next) {
    let registerData = req.body;
    registerData.password = password;
    //let registerationSave = new model.register(registerData)
    addToDB(registerData, res)
    // registerationSave.save().then((userDetails => {
    //     console.log("dataaaaaaaaaa", userDetails);
    //     let payload = { subject: userDetails._id }
    //     let token = jwt.sign(payload, 'secretKey')
    //     res.json({ token });
    //     sendMail(registerData, info => {
    //     }).catch(function (err) {
    //         console.log("Mail Sending errors", err)
    //     });
    // })).catch(err => {
    //     console.log("error is", err)
    //     res.status(400).send("unable to save to database");
    // })
});

async function addToDB(req, res) {
    var userData = new model.register({
        userType: req.userType,
        orgName: req.orgName,
        fullName: req.fullName,
        email: req.email,
        password: model.register.hashPassword(req.password),
        mobile: req.mobile,
        mailVerify: req.mailVerify,
        mobleVerify: req.mobleVerify,
        loginAttemp: req.loginAttemp,
        creationDate: Date.now()
    })
    sendMail(req, info => {
    }).catch(function (err) {
        console.log("Mail Sending errors", err)
    });
    try {
        doc = await userData.save();
        return res.status(201).json(doc)
    } catch (err) {
        return res.status(501).json(err)
    }
}

router.post("/auth", function (req, res,next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {return res.status(401).json(err) }
        if (!user) {console.log("value is ",info);  return res.status(201).json(info); }
        req.logIn(user, function(err) {
          if (err) { return res.status(201).json(err); }
          console.log("sssssssssss");
          return res.status(200).json({msg:'Successfull'});
        });
      })(req, res, next);
    // let userData = req.body;
    // model.register.findOne({ email: userData.email }, (error, user) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         if (!user) {
    //             res.status(401).send('Invalid email');
    //         } else {
    //             if (user.password != userData.password) {
    //                 res.status(401).send("Invalid Password")
    //             } else {
    //                 let payload = { subject: user._id }
    //                 let token = jwt.sign(payload, 'secretKey')
    //                 model.register.updateOne({ loginAttemp: user.loginAttemp }, { $set: { loginAttemp: user.loginAttemp + 1 } }, function (attempCount) {
    //                     res.status(200).send({ "token": token, "userName": user.fullName, "orgName": user.orgName });
    //                 })
    //             }
    //         }
    //     }
    // })
})
router.get('/verify', function (req, res) {
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            res.redirect('http://localhost:4200')
            res.end();
            //res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});

async function sendMail(user, callback) {
    rand = Math.floor((Math.random() * 100) + 54);
    link = "http://" + host + "/api/vendor/verify?id=" + rand;
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
        to: user.email, // list of receivers
        subject: "Please confirm your Email account", // Subject line
        //text: "Hello world?", // plain text body
        html: "<b>Email</b>: " + user.email + "<br><b>Password</b>:" + password +
            "<br>Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"// html body
    };
    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

router.get('/logout',isValidUser, function(req, res,next) {
    req.logOut();
    return res.status(200).json({msg:'logout Successfully'})
})

router.get('/user',isValidUser,function(req,res,next){
    console.log("user details",req.user);
    return res.status(200).json(req.user);
  });
  
  
module.exports = router;
//})();