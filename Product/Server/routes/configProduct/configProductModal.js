var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configProduct = new Schema({
    name: { type: String, require: true },
    oldPrice: { type: String, require: true },
    newPrice: { type: String, require: true },
    image: { type: String, require: true },
    address: { type: String },
    userName: { type: String },
    discount: { type: String, require: true },
    unitMeasure: { type: String, require: true },
    Qnty: { type: String }
});

var orderedCheckList = new Schema({
    name: { type: String, require: true },
    oldPrice: { type: String, require: true },
    newPrice: { type: String, require: true },
    image: { type: String, require: true },
    address: { type: String },
    userName: { type: String , require: true }, 
    discount: { type: String, require: true },
    unitMeasure: { type: String, require: true },
    Qnty: { type: String },
    bookingDate: { type: String },
    orderId: { type: String },
    status: { type: String }
})

var setScheduler = new Schema({
    name: { type: String, require: true },
    oldPrice: { type: String, require: true },
    newPrice: { type: String, require: true },
    image: { type: String, require: true },
    address: { type: String },
    userName: { type: String }, 
    discount: { type: String, require: true },
    unitMeasure: { type: String, require: true },
    Qnty: { type: String },
    schedulerFromDate:{type:Date, require},
    schedulerToDate:{type:Date, require},
    scheduleDate:{type:Date, require}
})

var setAddress = new Schema({
    address: { type: String, require: true },
    date: { type: Date, require: true },
    userId:{type: String, require: true}
})

var cancelOrderList = new Schema({
    name: { type: String, require: true },
    oldPrice: { type: String, require: true },
    newPrice: { type: String, require: true },
    image: { type: String, require: true },
    address: { type: String },
    userName: { type: String , require: true }, 
    discount: { type: String, require: true },
    unitMeasure: { type: String, require: true },
    Qnty: { type: String },
    bookingDate: { type: String },
    orderId: { type: String },
    status: { type: String }
})

var configList = mongoose.model('configList', configProduct, 'configListStore');
var orderedList = mongoose.model('orderedList', orderedCheckList, 'orderedCheckList');
var setScheduler = mongoose.model('setScheduler', configProduct, 'setScheduler');
var setAddress = mongoose.model('setAddress', configProduct, 'setAddress');
var cancelOrder = mongoose.model('cancelOrder', cancelOrderList, 'cancelOrders');

module.exports = {
    configList: configList,
    orderedCheckList: orderedList,
    setScheduler:setScheduler,
    setAddress:setAddress,
    cancelOrder:cancelOrder
}
