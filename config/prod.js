// prod.js - production keys in here!!
//dev.js do not commit this file!!
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
};

//in the mongoURI you have to make sure that if you are going to 
//use special characters in your password then you need to encode
//the pasword into the url. otherwise do not use special chars
//also include the name of your database right before the question
//mark ? EX: emaily?retry