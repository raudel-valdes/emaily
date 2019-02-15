const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

//the order of these two requires are important because first
//you need to create and import your models and then you can 
//run passport to save to the database
require('./models/users'); 
require('./services/passport.js');

//connects to mongodb throguh mongoose and passes in our access key
mongoose.connect(keys.mongoURI);

const app = express();

//enabling cookies inside of our application. This allows for an user
//to essentially have a "session" within our application and we can
//keep track of who that user is and when we no longer want him
//in our application. Keys.cookieKey is a random string of characters
//that will be used to encode the session token/cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//this will make sure that passport knows to track the user
//with the key that we are grabbing from the mongodb id field
app.use(passport.initialize());
app.use(passport.session());

//here we import the functions from authRoutes.js and then call
//it by attatching () next to it and passing it in the variable app
require('./routes/authRoutes.js')(app);

//either do it in the port provided by huroku or on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);