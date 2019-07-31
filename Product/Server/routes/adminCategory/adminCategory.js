var app = require('express').Router();
var model = require('./adminModel');
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

//const router = express.Router();

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
        console.log(productData.catName+"/"+productData.imageUrl)
        productData.imageUrl=productData.catName+"/"+productData.imageUrl;
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
    


    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, file.originalname);
        }
      });
      
      var upload = multer({ storage : storage }).array('myFile',2);
      
    app.post('/product/images',  (req, res) => {
        upload(req,res,function(err) 
        {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.json({'message': 'File uploaded'});
        });      
    });


    app.put("/product", function (req, res)
     {
        console.log("product Data===111>",req.body);
        let productData = req.body;
        productData.imageUrl=productData.catName+"/"+productData.imageUrl;
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