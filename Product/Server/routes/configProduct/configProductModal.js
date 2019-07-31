var mongoose = require('mongoose');
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var configProduct = new Schema({
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
            
var configList = mongoose.model('configList', configProduct);

module.exports={
    configList:configList
}
    