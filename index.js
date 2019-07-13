const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//the order of these two requires are important because first
//you need to create and import your models and then you can 
//run passport to save to the database
require('./models/users'); 
require('./services/passport.js');

//connects to mongodb throguh mongoose and passes in our access key
mongoose.connect(keys.mongoURI);

//logs out any errors that happen with the connection to the mongo cluster/database
mongoose.connection.on( 'error', (error) => console.log('ERROR:', error));

//creating our express application
const app = express();

//MiddleWear attatched to Express in order to parse through 
//the body of each request so that we can access this information
//since Express does not offer this functionality
app.use(bodyParser.json());

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
require('./routes/billingRoutes.js')(app);

//This will only run if we are in HEROKU's production
//NODE_ENV is a HEROKU's enviroment variable
if (process.env.NODE_ENV === 'production') {
    //Express will serve up production assets
    //like our main.js file, or main.css file!

    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it doesn't recognize the route

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    });
}

//either do it in the port provided by huroku or on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);