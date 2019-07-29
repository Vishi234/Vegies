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
 
        var productSchema = new Schema({
            catName: {type: String, require: true},
            subCatName: {type: String, require: true},
            unitMeasure: {type: String, require: true},
            actualPrice: {type: String, require: true}, 
            productName: {type: String,unique: true,  require: true},
            productAlias: {type: String, require: true},
            price: {type: String, require: true},
            discount: {type: String, require: true},
            active: {type: Number, require: true},
            imageUrl:{type: String, require: true}
            })
            var product = mongoose.model('product', productSchema);
            
            module.exports={
                Category:Category,
                subCategory:subCategory,
                product:product
            }

        

    