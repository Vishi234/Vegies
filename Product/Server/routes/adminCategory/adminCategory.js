module.exports = (function() {
    'use strict';
    var adminCategory = require('express').Router();

    adminCategory.get('/category', function (req, res) {
        res.send([{'name':'jss','id':'2'},
        {'name':'singh','id':'3'}]);
    });
    adminCategory.post('/category', function (req, res) {
        console.log("Hiiiiiii")
        res.send([{'name':'jss','id':'2'},
        {'name':'singh','id':'3'}]);
    });

    return adminCategory;
})();