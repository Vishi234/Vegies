var app = require('express').Router();
var model = require('./adminModel');
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

//const router = express.Router();

module.exports = (function () {
    'use strict';
    app.get("/category", function (req, res) 
    {
        model.Category.find({status:'Active'}).then(getCategory=>{
            res.send(getCategory);
        })
    });
    app.get("/subCategory", function (req, res) {

        model.subCategory.find({status:'Active'}).then(getsubCategory=>
            {
            res.send(getsubCategory);
        })	
    });

    app.post("/category", function (req, res) 
    {
       console.log('Request Data--',req.body)
        let categoryData = req.body;
        let categorySave = new model.Category(categoryData);
        categorySave.save().then((items => 
            {
                    res.status(201).json({ "status": "Category added successfully" });
                })).catch(err => {
                    res.status(201).json({ "error": "Unable to save Category" });
                })
    });
    app.put("/category", function (req, res) 
    {
         console.log('Request Data--',req.body)
         let categoryData = req.body;
          model.Category.updateOne({ _id: categoryData._id }, { $set: { catName: categoryData.catName ,catAlias:categoryData.catAlias,status:categoryData.status } }, (attempCount)=> {
              res.status(201).json({ status:'Category data has been updated successfully'});
            }).catch(err => {
                res.status(400).send("unable to save to database");
            })
     });

    app.post("/subCategory", function (req, res) 
    {            
        let subCategoryData = req.body;
        console.log("subCatData-->",subCategoryData)
        let subCategorySave = new model.subCategory(subCategoryData)
        console.log('--->  ',subCategorySave)
        subCategorySave.save().then((items => {
            res.status(201).json({"status":"Sub Category added successfully"});
        })).catch(err => {
            res.status(201).json({"error":"unable to save Sub Category"});
        })
    });
    app.put("/subCategory", function (req, res) 
    {            
        let subCategoryData = req.body;
        model.subCategory.updateOne({ _id: subCategoryData._id }, { $set: { catName: subCategoryData.catName ,subCatName:subCategoryData.subCatName,subCatAlias:subCategoryData.subCatAlias,active:subCategoryData.active } }, (attempCount)=> {
            res.status(201).json({ status:'SuCategory data has been updated successfully'});
          })
    });
    app.post("/product", function (req, res) 
	{ 
        let productData = req.body;   
        productData.imageUrl=productData.imageUrl;
        console.log('productData--',productData);
        delete productData._id;
        console.log("data issss",productData);

        // model.product.collection.insert(productData, function (err, docs) {
        //     if (err) {
        //         console.log("erre---",err);
        //         return console.error(err);
        //     } else {
        //         res.status(201).json({ "status": "Products are schedule successfully" });
        //     }
        // });


        let productDataSave = new model.product(productData)
        productDataSave.save().then((items => 
		{
            res.status(201).json({"status":"Product added successfully"});
        })).catch(err => {
            res.status(201).json({"error":"unable to save to database"});
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
      
      var upload = multer({ storage : storage }).array('imageUrl',2);
      
        app.post('/product/images',  (req, res) => 
        {
        upload(req,res,function(err) 
        {
            if(err) {
                return res.end("Error uploading file.");
            }
         res.status(200).json({ message:'Product data has been updated successfully'});
      
        });      
    });
    


    app.put("/product", function (req, res)
     {
        let productData = req.body;

        model.product.updateOne({ _id: productData._id }, { $set: { catName: productData.catName ,price:productData.price } }, (attempCount)=> {
            res.status(201).json({ status:'Product data has been updated successfully'});
          })

        // console.log('update data===',productData);
        // productData.imageUrl=productData.catName+"/"+productData.imageUrl;
        // let productDataSave = new model.product(productData)
        // productDataSave.save().then((items => 
		// {
        //     res.status(200).send("Product updated successfully");
        // })).catch(err => {
        //     //console.log("errwwww", err)
        //     res.status(400).send("unable to save to database");
        // })
    });
    app.get("/product", function (req, res) {
        model.product.find({status:'Active'}).then(getproduct=>{
            res.send(getproduct);
        })	
    });
    return app;
})();