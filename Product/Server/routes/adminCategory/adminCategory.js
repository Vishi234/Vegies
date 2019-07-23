var sql = require("mssql");
var config = require("../../config/dbConfig");
var app = require('express').Router();
var model = require('./adminModel');



module.exports = (function () {
    'use strict';
    // function verifyToken(req,res,next){
    //          if(!req.header.authorization){
    //              console.log("hi");
    //              return res.status(401).send('Unauthorized Request');
    //          }
    //          let token=req.header.authorization.split(' ')[1];
    //          if(token=='null'){
    //             console.log("hi1");
    //             return res.status(401).send('Unauthorized Request');
    //          }
    //          let payload=jwt.verify(token,'secretKey')
    //          if(!payload){
    //             console.log("hi1");
    //             return res.status(401).send('Unauthorized Request');
    //          }
    //          req.userId=payload.subject
    //          next();
    //      }
    app.get("/category", function (req, res) {
        console.log('Invoked Category');
        model.Category.find().then(getCategory=>{
            console.log("getCategoryyyyyyy",getCategory)
            res.send(getCategory);
        })
    });
    app.get("/subCategory",function (req, res) {
        console.log('Invoked SubCategory');
        model.subCategory.find().then(getsubCategory=>{
            console.log("getCategoryyyyyyy",getsubCategory)
            res.send(getsubCategory);
        })	
    });

    app.post("/category", function (req, res) {
        console.log("hiiiiiiiiii");
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

    app.post("/subCategory", function (req, res) {
        console.log("hiiiiiiiiii",req.body);
        let subCategoryData = req.body;
        let subCategorySave = new model.subCategory(subCategoryData)
        subCategorySave.save().then((items => {
            console.log("dataaaaaaaaaa", items);
            res.status(200).send("Sub Category added successfully");
        })).catch(err => {
            console.log("errwwww", err)
            res.status(400).send("unable to save to database");
        })
    });
    app.post("/product", function (req, res) 
	{
        console.log("product Data===>",req.body);
        let productData = req.body;
        let productDataSave = new model.product(productData)
        productDataSave.save().then((items => 
		{
            console.log("dataaaaaaaaaa", items);
            res.status(400).send("Product added successfully");
        })).catch(err => {
            console.log("errwwww", err)
            res.status(400).send("unable to save to database");
        })
    });
    app.put("/product", function (req, res) {
        console.log("product Data===>",req.body);
        let productData = req.body;
        let productDataSave = new model.product(productData)
        productDataSave.save().then((items => 
		{
            console.log("dataaaaaaaaaa", items);
            res.status(400).send("Product updated successfully");
        })).catch(err => {
            console.log("errwwww", err)
            res.status(400).send("unable to save to database");
        })
    });
    app.get("/product", function (req, res) {
        console.log('Invoked product');
        model.product.find().then(getproduct=>{
            console.log("product--",getproduct)
            res.send(getproduct);
        })	
    });
    return app;
})();