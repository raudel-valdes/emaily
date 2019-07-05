const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    //This takes care of the scenerio in which someone
    //calls our API route and is not logged in. This will
    //stop the request and give the client side an error.
    //This is not the best way to do it because it can 
    //become very reptitive from route to route. 
    //This will be refactored in the future.
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }

    //this is the way that the backend can
    //tell scripe to make a transaction
    //by grabbing and passing the values
    //passed by stripe in our frontend
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id  
    });

    //it is built into passport to give us our user model
    //during a request. It is part of our initialization 
    //process with passport in the root index.js file
    req.user.credits += 5;
    const user = await req.user.save();
    
    //This will allow the request to be completed
    //and not be left hanging in the client side
    res.send(user);
  });
};