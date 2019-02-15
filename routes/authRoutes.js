const passport = require('passport');

module.exports = app => {

    //  asking google to allow the user to sign in and provide access 
    //  to the profile and email. scope specifies what user info we are
    //  trying to access. passport knows that the string 'google' is 
    //  refering to the the google strategy
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

    //when we call logout is a function that is attatched automaticallly to
    //req by passort. It takes the cookie that contains the user ID
    //and kills it. That way it will notice that i has no idea who is there
    //and logs them out.
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    //returns to the website the user information right after signing in.
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};