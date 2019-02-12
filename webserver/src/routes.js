const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt');

const auth = require('./authservice');

const router = express.Router();

//for handling JSON data in router
router.use(bodyParser.json());

//redirect if the client doesn't provide a valid auth token
const routeVerify = function(req, res, next) {
    let options = {
        issuer: 'Incuvision Authorization Service',
        subject: req.body.userId,
        audience: 'http://localhost'
    }
    if (auth.verify(req.query.authToken, options)) {
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
        issuer: 'Incuvision Authorization Service',
        subject: 'reed',
        audience: 'http://localhost'
    }
    let payload = {name: "reed"};
    let newToken = auth.sign(payload, options);
    console.log("token: " + newToken);
    res.send(newToken.replace(" ", ""));
});

router.post('/api/login', (req, res) => {
    if (authenticate(req.user)) {
        let authToken = auth.sign({email: req.user.email, userId: req.user.userId});
        res.send(authToken);
    }
});

router.get('/test', (req, res) => {
    console.log('/test route requested.');
    res.send("test!");
});

module.exports = router;