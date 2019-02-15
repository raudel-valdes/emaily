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
//it will call a fucniton and console.log the access token
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' 
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }).then((existingUser) => {
            if (existingUser) {
                //we already have a record with the giver profile id
                done(null, existingUser);
            } else {
                //we dont have a user record with this id, make a new record
                new User({ googleID: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        })        
    }
  )
);