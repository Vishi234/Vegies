var db = require("../../config/dbConfig")
var sql = require("mssql");
const nodemailer = require("nodemailer");
var generator = require('generate-password');

module.exports = (function () {
    'use strict';
    var password = generator.generate({
        length: 10,
        numbers: true,
        symbols:true
    });
    console.log(password,"password")
    var app = require('express').Router();
    //POST API
    app.post("/registration",function(req,res){
        console.log("register",req.body)
        let user =req.body;
        sendMail(user,info=>{
           res.send(info);
        }).then(
                db.connect().then(function (request) {
                    return request.request()
                        .input("U_TYPE", sql.NVarChar, req.body.userType)
                        .input("U_ORG_NM", sql.NVarChar, req.body.orgName)
                        .input("U_FNAME", sql.NVarChar, req.body.fullName)
                        .input("U_PHONE", sql.NVarChar, req.body.mobile)
                        .input("MAIL", sql.Int, req.body.email)
                        .input("U_PASS", sql.NVarChar, req.body.password)
                        .input("U_MAIL_VERIFY", sql.Bit, req.body.mailVerify)
                        .input("U_LOGIN_ATTMPT", sql.Int, req.body.loginAttemp)
                        .output("Result", sql.VarChar(100))
                        .execute('USER_REGISRATION').then(result => {
                            res.send(result);
                            db.close();
                        })
                        .catch(function (err) {
                            db.close();
    
                        });
                })
        )
    })

    async function sendMail(user,callback){
        console.log("user details",user)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'ajay14052019@gmail.com', // generated ethereal user
              pass: 'Testing@12' // generated ethereal password
            }
          });
    

    let mailOptions = {
        from: '"SVJ Group"', // sender address
        to: user.email, // list of receivers
        subject: "Hello to SVJ Group", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Email</b>: "+user.email+"<br><b>Password</b>:"+password // html body
      };

    let info=await transporter.sendMail(mailOptions);
    callback(info);
    }
    // app.post("/registration", function (req, res) {
    //     console.log("body", req.body)
    //     db.connect().then(function (request) {
    //         return request.request()
    //             .input("P_INSERT_TYPE", sql.Int, req.body.productCat)
    //             .input("P_CAT_ID", sql.Int, req.body.catId)
    //             .input("P_CAT_NAME", sql.NVarChar, req.body.catName)
    //             .input("P_CAT_DESC", sql.NVarChar, req.body.catAlias)
    //             .input("P_SUBCAT_ID", sql.Int, req.body.START_DATE)
    //             .input("P_SUBCAT_NAME", sql.NVarChar, req.body.END_DATE)
    //             .input("P_SUBCAT_DESC", sql.NVarChar, req.body.IS_ACTIVE)
    //             .input("P_USER_ID", sql.NVarChar, req.body.OPER_TYPE)
    //             .input("IS_ACTIVE", sql.Bit, req.body.Active)
    //             .input("P_OPER", sql.Char, req.body.OPER_TYPE)
    //             .output("FLAG", sql.Char(1))
    //             .output("MSG", sql.VarChar(100))
    //             .execute('SP_PRODUCT_CATEGORY_AMD').then(result => {
    //                 res.send(result);
    //                 console.log(result);
    //                 db.close();
    //             })
    //             .catch(function (err) {
    //                 db.close();

    //             });
    //     }).catch((err) => {
    //         db.close();
    //         console.log("error is", err)
    //     })
    // });
    return app;
})();