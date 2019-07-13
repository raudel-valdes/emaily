//This takes care of the scenerio in which someone
//calls our API route and is not logged in. This will
//stop the request and give the client side an error.
//This is not the best way to do it because it can 
//become very reptitive from route to route. 
//This will be refactored in the future.
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};