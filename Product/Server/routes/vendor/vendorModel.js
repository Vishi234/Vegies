var mongoose = require('mongoose');
var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var loginSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    })
    var login = mongoose.model('login', loginSchema);

    var registerSchema = new Schema({
        userType: {type: String},
        orgName: {type: String, require: true},
        fullName: {type: String, require: true},
        email: {type: String, unique: true, require: true},
        mobile: {type: String, require: true},
        password: {type: String, require: true},
        mailVerify: {type: String},
        mobleVerify: {type: String},
        loginAttemp: {type: Number},
        })
        var register = mongoose.model('register', registerSchema);

        
        module.exports={
            login:login,
            register:register
        }
    

    