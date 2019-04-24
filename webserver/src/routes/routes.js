// NPM Modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

// User-created imports
const util = require('../middleware');
const auth = require('../authentication');
const passport = require('../PassportConfig');
const UserRoutes = require('./UserRoutes.js').router;
const ExperimentRoutes = require('./ExperimentRoutes.js').router;
const PositionRoutes = require('./PositionRoutes.js').router;
const ImageRoutes = require('./ImageRoutes.js').router;
const JobRoutes = require('./JobRoutes.js').router;
const JobCommandRoutes = require('./JobCommandRoutes.js').router;
const MoveRoutes = require('./MoveRoutes.js').router;

// Express Router object (mounted in index.js)
const router = express.Router();

// For handling JSON data in router
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Logging middleware
router.use(util.log);

// Set up express-session
// const secret = fs.readFileSync(__dirname + '/../api/public.key');
const secret = "incuvision-2019";
router.use(session({ secret: secret }));

// Initialize passport middleware
router.use(passport.initialize());
router.use(passport.session());

// API routes
router.use('/users', UserRoutes);
router.use('/experiments', ExperimentRoutes);
router.use('/positions', PositionRoutes);
router.use('/images', ImageRoutes);
router.use('/jobs', JobRoutes);
router.use('/jobCommands', JobCommandRoutes);
router.use('/move', MoveRoutes);

// Index route
router.get('/', auth.required, (req, res) => {
	res.redirect('/home');
});

// Home page
router.get('/home', auth.required, (req, res) => {
	res.render('home');
});

// Experiments page
router.get('/experiments', auth.required, (req, res) => {
	res.render('experiments');
});

// Create Experiment page
router.get('/experiments/new', auth.required, (req, res) => {
	res.render('experiment_new');
});

// Individual Experiment page
router.get('/experiments/:id', auth.required, (req, res) => {
	res.render('experiment_individual', { experimentId: req.params.id });
});

// Login page
router.get('/login', (req, res) => {
	res.render('login');
});

// User account authentication route (passport used as middleware)
router.post('/login', (req, res) => {
	passport.authenticate('local', function (err, user, info) {
		console.log("got to this");
		
		if (err) { return res.send(err) }
		if (!user) {
			return res.send({authenticated: "false"});
		}

		req.login(user, function (err) {
			console.log("attempting login");
			if (err) {
				console.log(err);
				res.send(err);
			}
			return res.send({authenticated:"true"});
		});
	})(req, res);
});

router.get('/logout', auth.required, (req, res) => {
	req.session.destroy(function (err) {
		res.redirect('/login');
	});
});

router.get('/createUser', (req, res) => {
	res.render('createuser');
});

module.exports = router;