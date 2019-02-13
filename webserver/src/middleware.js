// Redirect if the client doesn't provide a valid jwtservice token
exports.routeVerify = function(req, res, next) {
    let options = {
        issuer: 'Incuvision jwtserviceorization Service',
        subject: req.body.userId,
        audience: 'http://localhost'
    }
    if (jwtservice.verify(req.query.jwtserviceToken, options)) {
        return next();
    }
    res.redirect('/login');
}

//Basic logging function -- timestamp for requests
exports.log = function(req, res, next) {
    let date = new Date();
    console.log(req.method + " request made to url " + req.url + " at time " + date.toLocaleTimeString());
    console.log("\tRequest contained body " + JSON.stringify(req.body));
    next();
}
