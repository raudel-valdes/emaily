//dev.js do not commit this file!!
module.exports = {
    googleClientID: '1048204722424-fk1nncjs7smsu47m8qofkaeq1hs9glha.apps.googleusercontent.com',
    googleClientSecret: 'uTIKjyPM5WqKpPhHifVgdeUo',
    mongoURI: 'mongodb+srv://r0vald06:1096rvald1096rvv@emaily-e47v7.mongodb.net/emaily?retryWrites=true',
    cookieKey: 'sdjkbfdskbfkbkbdfbsbsbiuberibv',
    stripePulishableKey: 'pk_test_Fw6lgNsgRQCklDNXtvq0RWSG00aVlps5oY',
    stripeSecretKey: 'sk_test_GrMvqzhsAS4ab2aIRokpMTHF00yhHGrpvf'
}

//in the mongoURI you have to make sure that if you are going to 
//use special characters in your password then you need to encode
//the pasword into the url. otherwise do not use special chars
//also include the name of your database right before the question
//mark ? EX: emaily?retry