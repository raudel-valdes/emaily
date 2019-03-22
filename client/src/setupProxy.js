const proxy = require('http-proxy-middleware'); 

module.exports = function(app) {
    app.use(proxy('/auth/google/*callback', { target: 'http://localhost:3000', 'secure': false, "changeOrigin": true }))
    app.use(proxy('/api/*', { target: 'http://localhost:5000', 'secure': false, "changeOrigin": true }))
    app.use(proxy('/auth/*google', { target: 'http://localhost:5000', 'secure': false, "changeOrigin": true }))
}



//This is used for when we are doing local testing and developing
//any requests that we might make with relative paths get tacked on
//to the the target url 