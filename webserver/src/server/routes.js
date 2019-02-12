const express = require('express');
const bodyParser = require('body-parser');
const jwtservice = require('../api/JWTService');

const router = express.Router();

//for handling JSON data in router
router.use(bodyParser.json());

//redirect if the client doesn't provide a valid jwtservice token
const routeVerify = function(req, res, next) {
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

const log = function(req, res, next) {
    let date = new Date();
    console.log("Request made to url " + req.url + " at time " + date.toLocaleTimeString());
    next();
}
router.use(log);

router.get('/', routeVerify, (req, res) => {
    res.sendFile('test.html', {root: __dirname+'/public'});
    // res.send('index');
});

router.get('/login', (req, res) => {
    res.sendFile('tokenstore.html', {root: __dirname+'/public'});
});

router.post('/create', (req, res) => {
    let options = {
        issuer: 'Incuvision jwtserviceorization Service',
        subject: 'reed',
        audience: 'http://localhost'
    }
    let payload = {name: "reed"};
    let newToken = jwtservice.sign(payload, options);
    console.log("token: " + newToken);
    res.send(newToken.replace(" ", ""));
});

router.post('/api/login', (req, res) => {
    if (jwtserviceenticate(req.user)) {
        let jwtserviceToken = jwtservice.sign({email: req.user.email, userId: req.user.userId});
        res.send(jwtserviceToken);
    }
});

router.get('/test', (req, res) => {
    console.log('/test route requested.');
    res.send("test!");
});

module.exports = router;