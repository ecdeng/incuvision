// NPM imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Models import
const db = require('./DBManager');
const users = require('./routes/UserRoutes');

// Configure Passport strategy
// The inner function is what the LocalStrategy will use to verify a user/pwd combo
passport.use(new LocalStrategy(
	function (username, password, done) {
		users.methods.getByUsername(username)
			.then((user) => {
				let isValid = users.methods.validatePassword(user.salt, user.hash, password);
				if (!user) {
					return done(null, false);
				}
				if (!isValid) {
					return done(null, false);
				}
				return done(null, user);
			})
			.catch((err) => { return done(err) });
	}
));

passport.serializeUser(function (user, cb) {
	cb(null, user.userId);
});

passport.deserializeUser(function (userId, cb) {
	console.log("deserializeUser called");
	
	users.methods.getById(userId)
		.then((user) => {
			cb(null, user);
		})
		.catch((err) => cb(err));
});

module.exports = passport;