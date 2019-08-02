var mongoose = require('mongoose');
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var configProduct = new Schema({
            name: {type: String, require: true},
            oldPrice: {type: String, require: true},
            newPrice: {type: String, require: true}, 
            image:{type: String, require: true},
            address:{type: String, require: true},
            userName:{type: String, require: true},
            discount:{type: String, require: true},
            unitMeasure:{type: String, require: true},
            Qnty:{type: String, require: true}
            })
            
var configList = mongoose.model('configList', configProduct);

module.exports={
    configList:configList
}
    