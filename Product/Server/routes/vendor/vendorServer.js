var db = require("../../config/dbConfig");
const nodemailer = require("nodemailer");
var generator = require('generate-password');
var model = require("./vendorModel");
const jwt = require("jsonwebtoken");
var express = require('express');
var app = express(); 

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

    router.post("/registration", function (req, res) {
        let registerData = req.body;
        console.log("cateeeeeeeeeee", registerData);
        registerData.password = password;
        let registerationSave = new model.register(registerData)
        registerationSave.save().then((userDetails => {
            console.log("dataaaaaaaaaa", userDetails);
            let payload = { subject: userDetails._id }
            let token = jwt.sign(payload, 'secretKey')
            res.json({ token });
            sendMail(registerData, info => {
            }).catch(function (err) {
                console.log("Mail Sending errors", err)
            });
        })).catch(err => {
            console.log("error is", err)
            res.status(400).send("unable to save to database");
        })
    });

    router.post("/login", function (req, res) {
        let userData = req.body;
        model.register.findOne({ email: userData.email }, (error, user) => {
            if (error) {
                console.log(error);
            } else {
                if (!user) {
                    res.status(401).send('Invalid email');
                } else {
                    if (user.password != userData.password) {
                        res.status(401).send("Invalid Password")
                    } else {
                        console.log("kkkkkkkkkk-------------------------",user.loginAttemp)
                        let payload = { subject: user._id }
                        let token = jwt.sign(payload, 'secretKey')
                        model.register.updateOne({loginAttemp: user.loginAttemp},{ $set :{loginAttemp: user.loginAttemp+1}},function(attempCount){
                           console.log("sessssss11",user.fullName)
                            res.status(200).send({"token": token,"userName":user.fullName,"orgName":user.orgName });
                        })
                        console.log("hiiiiiiiiii")
                    }
                }
            }
        })
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
                "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"// html body
        };
        let info = await transporter.sendMail(mailOptions);
        callback(info);
    }

    router.get('/data',(req,res)=>{
        console.log("hhhhhhhhhhhhhhh",req.session)
        //res.send('user is =>'+req.session.email)
    })
    module.exports = router;
//})();