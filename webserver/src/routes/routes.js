// NPM Modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

// User-created imports
const util = require('../middleware');
const auth = require('../Authentication');
const passport = require('../PassportConfig');
const userRoutes = require('./UserRoutes.js').router;

// Express Router object (mounted in index.js)
const router = express.Router();

// For handling JSON data in router
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.use(util.log);

// Set up express-session
// const secret = fs.readFileSync(__dirname + '/../api/public.key');
const secret = "incuvision-2019";
router.use(session({ secret: secret }));

// Initialize passport middleware
router.use(passport.initialize());
router.use(passport.session());

// API routes
router.use('/user', userRoutes);

// Index route
router.get('/', auth.required, (req, res) => {
	res.render('test.html');
});

// Login page
router.get('/login', (req, res) => {
	res.render('login.html');
});

// User account authentication route (passport used as middleware)
router.post('/login', (req, res) => {
	passport.authenticate('local', function (err, user, info) {
		if (err) { return res.send(err) }
		if (!user) {
			return res.send('No user!');
		}

		req.login(user, function (err) {
			console.log("attempting login");
			if (err) {
				console.log(err);
				res.send(err);
			}
			return res.redirect('/');
		});
	})(req, res);
});

router.get('/logout', auth.required, (req, res) => {
	req.session.destroy(function (err) {
    res.redirect('/login');
  });
});

router.get('/createUser', (req, res) => {
	res.sendFile('user.html', { root: __dirname + '../../../public' });
});

module.exports = router;