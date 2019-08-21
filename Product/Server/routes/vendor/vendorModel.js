var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
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
        creationDate:{type: Date}
        })
        registerSchema.statics.hashPassword=function hashPassword(password){
            return bcrypt.hashSync(password,10)
        }
        registerSchema.methods.isValid=function(hashedpassword){
            return bcrypt.compareSync(hashedpassword,this.password)
        }
        var register = mongoose.model('register', registerSchema);

        var configProductSchema = new Schema({
            name: {type: String, require: true},
            oldPrice: {type: Number, require: true, require: true},
            newPrice: {type: Number, require: true, require: true},
            unitMeasur: {type: String, unique: true, require: true},
            discount: {type: Number, require: true, require: true},
            // password: {type: String, require: true},
            // mailVerify: {type: String},
            // mobleVerify: {type: String},
            // loginAttemp: {type: Number},
            })
            var register = mongoose.model('register', registerSchema);

        
        module.exports={
            login:login,
            register:register,
            configProductSchema:configProductSchema
        }
    

    