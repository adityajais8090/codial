const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const establishIdentity = async function(email, password, done) {
    // find user and establish identity
    try {
        const existingUser = await User.findOne({ email: email }).exec();
        if (!existingUser || existingUser.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        return done(null, existingUser);
    } catch (err) {
        console.log('Error in finding User --> Password');
        return done(err);
    }
};

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, establishIdentity));

//Serialize to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null, user._id);
});

//Deserialize the user from the key in the cookie
passport.deserializeUser( async function(id,done){
    
    const user = await User.findById(id).exec();
    try{
        if(user){
        return done(null,user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
    } catch(err){
        console.log('Error in deserializing the user', err);
        return done(err);
    }
    });

    //check if user is authenticated
    passport.checkAuthentication = function(req,res,next){
        if(req.isAuthenticated()){
           return next();
        }
        //if user is not signed in
        return res.redirect('/users/sign-in');
    }

    passport.setAuthenticatedUser = function(req,res,next){
        if(req.isAuthenticated()){
            res.locals.user = req.user;
        }
        next();
    }

    module.exports = passport;

