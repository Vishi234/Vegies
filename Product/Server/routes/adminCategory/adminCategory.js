var sql = require("mssql");
module.exports = (function () {
    'use strict';
    var dbConfig = {
        user: 'vegies',
        password: 'y7s7%Jf0',
        server: '198.15.117.109',
        database: 'Vegies'
    };
    var adminCategory = require('express').Router();

    adminCategory.get('/', function (req, res) {
        res.send('Hello ExternalRoutes!');
    });
    adminCategory.post("/category", function (req, res) {
        console.log("reqqqqqqq", req.body);
        sql.connect(dbConfig).then(function (output11) {
            var request = new sql.Request();
            request.input("P_INSERT_TYPE", sql.Int, req.body.productCat)
            request.input("P_CAT_ID", sql.Int, req.body.catId)
            request.input("P_CAT_NAME", sql.NVarChar, req.body.catName)
            request.input("P_CAT_DESC", sql.NVarChar, req.body.catAlias)
            request.input("P_SUBCAT_ID", sql.Int, req.body.START_DATE)
            request.input("P_SUBCAT_NAME", sql.NVarChar, req.body.END_DATE)
            request.input("P_SUBCAT_DESC", sql.NVarChar, req.body.IS_ACTIVE)
            request.input("P_USER_ID", sql.NVarChar, req.body.OPER_TYPE)
            request.input("IS_ACTIVE", sql.Bit, req.body.Active)
            request.input("P_OPER", sql.Char, req.body.OPER_TYPE)
            request.output("FLAG", sql.Char, req.body.REPORT_ID)
            request.output("MSG", sql.NVarChar, req.body.REPORT_ID)
                .execute('SP_PRODUCT_CATEGORY_AMD').then(function (err, recordsets, returnvalue) {
                    console.log("recordsetsrecordsets1", recordsets)
                    console.log("anssssssssssssssssss", request.parameters.FLAG.value);
                    console.log("returnvalue1", returnvalue)
                }).catch(function (err) {
                    sql.close();
                    console.log('ERROR1::: ' + err)
                    console.log("----")
                    console.log(err)
                    console.log("====")
                    //console.log(recordsets)
                    console.log("----")
                    //console.log('ERROR2::: '+ sqlOutput);
                    //console.log('ERROR3::: '+ request.parameters.sqlOutput.value);
                });
        }).catch((err) => {
            sql.close();
            console.log("error is", err)
        })
    });
    adminCategory.post("/category/n", function (req, res) {
        console.log("hiiiiiii");
        var transaction = new sql.Transaction();
        transaction.connect(dbConfig).then(function () {
            transaction.begin().then(function () {
                var request = new sql.Request(transaction);
                request.input("P_INSERT_TYPE", sql.Int, req.body.productCat)
                request.input("P_CAT_ID", sql.Int, req.body.P_CAT_ID)
                request.input("P_CAT_NAME", sql.VarChar(100), req.body.catName)
                request.input("P_CAT_DESC", sql.VarChar(100), req.body.catAlias)
                request.input("P_SUBCAT_ID", sql.Int, req.body.P_CAT_ID)
                request.input("P_SUBCAT_NAME", sql.VarChar(100), req.body.subCatName)
                request.input("P_SUBCAT_DESC", sql.VarChar(100), req.body.subCatAlias)
                request.input("P_USER_ID", sql.VarChar(100), req.body.OPER_TYPE)
                request.input("IS_ACTIVE", sql.Bit, req.body.Active)
                request.input("P_OPER", sql.Char(1), req.body.OPER_TYPE)
                request.output("FLAG", sql.Char(1))
                request.output("MSG", sql.VarChar(100))

                // request.input("FLAG", sql.VarChar(18, 0), req.body.ProductPrice)  
                // request.input("MSG", sql.VarChar(18, 0), req.body.ProductPrice)  
                request.execute("SP_PRODUCT_CATEGORY_AMD").then(function (err, recordsets, returnvalue) {
                    // next.ifError(err);
                    console.log("recordsetsrecordsets1", recordsets)
                    console.log("anssssssssssssssssss", request.parameters.FLAG.value);
                    console.log("returnvalue1", returnvalue)
                    transaction.commit().then(function () {
                        console.log("anssssssssssssssssss", request.parameters.FLAG.value);
                        console.log("recordsetsrecordsets", recordsets)
                        console.log("returnvalue", returnvalue)
                        res.status(200).send(req.body);
                        conn.close();
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data");
            });
        }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while inserting data");
        });
    });

    return adminCategory;
})();