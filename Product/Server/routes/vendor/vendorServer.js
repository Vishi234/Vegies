var db = require("../../config/dbConfig")
console.log("dbbbbbbbb",db);
var sql = require("mssql");
const nodemailer = require("nodemailer");
var generator = require('generate-password');
var mailOptions, host;

module.exports = (function () {
    'use strict';
    var rand, host, link;
    var password = generator.generate({
        length: 10,
        numbers: true,
        //symbols: true
    });
    var app = require('express').Router();
    //POST API
    app.post("/registration", function (req, res) {
        host = req.get('host');
        let user = req.body;
        host = req.get('host');
        db.connect().then(function (request) {
            return request.request()
                .input("U_TYPE", sql.NVarChar, req.body.userType)
                .input("U_ORG_NM", sql.NVarChar, req.body.orgName)
                .input("U_FNAME", sql.NVarChar, req.body.fullName)
                .input("U_PHONE", sql.NVarChar, req.body.mobile)
                .input("MAIL", sql.NVarChar, req.body.email)
                .input("U_PASS", sql.NVarChar, password)
                .input("U_MAIL_VERIFY", sql.Bit, req.body.mailVerify)
                .input("U_LOGIN_ATTMPT", sql.Int, req.body.loginAttemp)
                .output("Result", sql.VarChar(100))
                .execute('USER_REGISRATION').then(result => {
                    res.status(200).send(result)
                    if (result.output.Result == 'USER REGISTERED SUCCESSFULLY') {
                        sendMail(user, info => {
                        }).catch(function (err) {
                            console.log("Mail Sending errors", err)
                        });
                    }
                    db.close();
                })
                .catch(function (err) {
                    console.log("error is", err)
                    db.close();

                });
        })
    })


    app.post("/login", function (req, res) {
        // db.getConnection((err, conn) => {
        //     console.log("hiiiiiiiiii",conn)
        //     // conn.then(function (request) {
        //     //     return request.request()
        //     //         .input("UserName", sql.NVarChar, req.body.email)
        //     //         .input("Password", sql.NVarChar, req.body.password)
        //     //         .output("Result", sql.VarChar(100))
        //     //         .execute('USER_LOGIN').then(result => {
        //     //             res.status(200).send(result);
        //     //             conn.release();
        //     //         })
        //     //         .catch(function (err) {
        //     //             console.log("error is", err)
        //     //             conn.release();
        //     //         });
        //     // })
        // })
        return new Promise((resolve,reject)=>{
            db.connect().then(function (request) {
                return request.request()
                    .input("UserName", sql.NVarChar, req.body.email)
                    .input("Password", sql.NVarChar, req.body.password)
                    .output("Result", sql.VarChar(100))
                    .execute('USER_LOGIN').then(result => {
                        resolve(res.status(200).send(result));
                        db.close();
                    })
                    .catch(function (err) {
                        console.log("error is", err)
                        db.close();
                        reject(err);
                    });
            })
        }).catch((err)=>{
            db.close();
            reject(err);
        })
    })


        
        


app.get('/verify', function (req, res) {
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
return app;
}) ();