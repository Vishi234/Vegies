var model=require('../routes/vendor/vendorModel')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
  function(username, password, done) {
    console.log("answer is",username.includes("@"))
    if(username.includes("@")){
    model.register.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }else{
    model.register.findOne({ mobile: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
  }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    model.register.findById(id, function(err, user) {
      done(err, user);
    });
  });

  module.exports= function isValidUser(req,res,next){
      if(req.isAuthenticated()) next()
      else res.redirect('/login');// res.status(401).json({msg:'Unauthorized request'})
  }
  