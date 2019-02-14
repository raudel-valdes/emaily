const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');
const app = express();

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
        console.log('accessToken: ',accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
    })
);

 asking google to allow the user to sign in and provide access 
 to the profile and email. scope specifies what user info we are
 trying to access. passport knows that the string 'google' is 
 refering to the the google strategy
app.get(
    '/auth/google',                   
    passport.authenticate('google', { 
        scope: ['profile', 'email'] 
    })
);

//this time around we are going to be recieving the user information
//we will be sending in the token that the user was provided with when 
//they accepted to give us premission to their account. Google will
// verify the token and return the required information
app.get('/auth/google/callback', passport.authenticate('google')); 

//either do it in the port provided by huroku or on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

