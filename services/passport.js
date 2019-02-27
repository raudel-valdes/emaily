const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

//one argument into this function means we are trying to 
//fetch a model out of mongo. two arguments means that
//we are trying to pass in a new model name and data
const User = mongoose.model('users');


//encodoes the user ID inside of the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//decodes the user ID inside of the cookie
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

//making that bridge that will help us connect to googles auth
//the callbackURL is the next endpoint that google will call
//after being authenticated. After the callbackURL executes 
//it will call a fucniton and console.log the access token.
//Heroku uses proxies to redirect traffic from our browser to
//the correct heroku servers and uses a proxy to do this.
//By specifiying 'proxy: true' we allow google to trust 
//the request even though it is no longer https....
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true 
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleID: profile.id })
        if (existingUser) {
            //we already have a record with the giver profile id
            return done(null, existingUser);
        }
        //we dont have a user record with this id, make a new record
        const user = await  new User({ googleID: profile.id }).save()
        done(null, user); 
    }
  )
);