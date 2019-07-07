var sql = require("mssql");
var db = require("../../config/dbConfig")
module.exports = (function () {
    'use strict';
    var app = require('express').Router();
    //POST API
    app.post("/category", function (req, res) {
        console.log("body", req.body)
        db.connect().then(function (request) {
            return request.request()
                .input("P_INSERT_TYPE", sql.Int, req.body.productCat)
                .input("P_CAT_ID", sql.Int, req.body.catId)
                .input("P_CAT_NAME", sql.NVarChar, req.body.catName)
                .input("P_CAT_DESC", sql.NVarChar, req.body.catAlias)
                .input("P_SUBCAT_ID", sql.Int, req.body.START_DATE)
                .input("P_SUBCAT_NAME", sql.NVarChar, req.body.END_DATE)
                .input("P_SUBCAT_DESC", sql.NVarChar, req.body.IS_ACTIVE)
                .input("P_USER_ID", sql.NVarChar, req.body.OPER_TYPE)
                .input("IS_ACTIVE", sql.Bit, req.body.Active)
                .input("P_OPER", sql.Char, req.body.OPER_TYPE)
                .output("FLAG", sql.Char(1))
                .output("MSG", sql.VarChar(100))
                .execute('SP_PRODUCT_CATEGORY_AMD').then(result => {
                    res.send(result);
                    console.log(result);
                    db.close();
                })
                .catch(function (err) {
                    db.close();

                });
        }).catch((err) => {
            db.close();
            console.log("error is", err)
        })
    });

    var executeQuery = function (res, query) {
        db.connect().then(function (request) {
            return request.request()
                .query(query, function (err, res1) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    }
                    else {
                        res.send(res1);
                        db.close()
                    }
                });
        });
    }

    //GET APIs
    app.get("/category", function (req, res) {
        var query = "select * from MST_PRODUCT_CATEGORY";
        executeQuery(res, query);
    });

//----------------------sunil--------

  app.post("/subCategory", function (req, res) {
        console.log("body", req.body)
        db.connect().then(function (request) {
            return request.request()
                .input("P_INSERT_TYPE", sql.Int, req.body.productCat)
                .input("P_CAT_ID", sql.Int, req.body.catId)
                .input("P_CAT_NAME", sql.NVarChar, req.body.catName)
                .input("P_CAT_DESC", sql.NVarChar, req.body.catAlias)
                .input("P_SUBCAT_ID", sql.Int, req.body.START_DATE)
                .input("P_SUBCAT_NAME", sql.NVarChar, req.body.subCatName)
                .input("P_SUBCAT_DESC", sql.NVarChar, req.body.subCatAlias)
                .input("P_USER_ID", sql.NVarChar, '')
                .input("IS_ACTIVE", sql.Bit, req.body.Active)
                .input("P_OPER", sql.Char, req.body.OPER_TYPE)
                .output("FLAG", sql.Char(1))
                .output("MSG", sql.VarChar(100))
                .execute('SP_PRODUCT_CATEGORY_AMD').then(result => {
                    res.send(result);
                    console.log(result);
                    db.close();
                })
                .catch(function (err) {
                    db.close();

                });
        }).catch((err) => {
            db.close();
            console.log("error is", err)
        })
    });

    var executeQuery = function (res, query) {
        db.connect().then(function (request) {
            return request.request()
                .query(query, function (err, res1) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    }
                    else {
                        res.send(res1);
                        db.close()
                    }
                });
        });
    }

    //GET APIs
    app.get("/subCategory", function (req, res) 
	{
	console.log('-------------get subcat invoked');
	 db.close();
        var query = "select * from MST_PRODUCT_SUBCATEGORY";
        executeQuery(res, query);
    });

    return app;
})();