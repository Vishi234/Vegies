var mongoose = require('mongoose');
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var categorySchema = new Schema({
    productCat: {type: String, require: true},
    catName: {type: String, unique: true, require: true},
    catAlias: {type: String, require: true},
    Active: {type: Number, require: true},
    })
    var Category = mongoose.model('category', categorySchema);

    var subCategorySchema = new Schema({
        mainProduct: {type: String, require: true},
        subCatName: {type: String, unique: true, require: true},
        subCatAlias: {type: String, require: true},
        Active: {type: Number, require: true},
        })
        var subCategory = mongoose.model('subCategory', subCategorySchema);

        
        module.exports={
            Category:Category,
            subCategory:subCategory
        }
    

    