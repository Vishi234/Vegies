var app = require('express').Router();
var model = require('./configProductModal');


module.exports = (function () {

    function verifyToken(req,res,next){
        if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request')
        }
        let token=req.headers.authorization.split(' ')[1]
        if(token===null){
            return res.status(401).send('Unauthorized request')
        }
        let payload=jwt.verifyToken(token,'secretKey')
        if(!payload){
            return res.status(401).send('Unauthorized request')
        }
        req.userId=payload.subject
        next();
    }

    app.post("/saveList",verifyToken, function (req, res) {
        let categoryData = req.body;
        console.log("cateeeeeeeeeee", categoryData);
        let categorySave = new model.Category(categoryData)
        categorySave.save().then((items => {
            console.log("dataaaaaaaaaa", items);
            res.status(200).send(items);
        })).catch(err => {
            console.log("errwwww", err)
            res.status(400).send("unable to save to database");
        })
    });

})