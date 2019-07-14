var sql = require("mssql");
var config = require("../../config/dbConfig");
var app = require('express').Router();
var model = require('./adminModel');



module.exports = (function () {
    'use strict';

    app.get("/category", function (req, res) {
        console.log('Invoked Category');
        model.Category.find().then(getCategory=>{
            console.log("getCategoryyyyyyy",getCategory)
            res.send(getCategory);
        })
    });
    app.get("/subCategory", function (req, res) {
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
            res.status(400).send("Category added successfully");
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
            res.status(400).send("Sub Category added successfully");
        })).catch(err => {
            console.log("errwwww", err)
            res.status(400).send("unable to save to database");
        })
    });
    return app;
})();