var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configProduct = new Schema({
            name: {type: String, require: true},
            oldPrice: {type: String, require: true},
            newPrice: {type: String, require: true}, 
            image:{type: String, require: true},
            address:{type: String},
            userName:{type: String},
            discount:{type: String, require: true},
            unitMeasure:{type: String, require: true},
            Qnty:{type: String}
            })
            
var configList = mongoose.model('configList', configProduct,'configListStore');

module.exports={
    configList:configList
}
    