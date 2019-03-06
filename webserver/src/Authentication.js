const auth = {
  required: function (req, res, next) {
		if (req.user) next();
		
		// continue to destination after logging in
		// e.g. navigate to /experiments, get sent to /login, then go right to
		// intended destination instead of /home
    else {
			req.session.previous = req.originalUrl;
			res.redirect('/login');
		}
  }
}

module.exports = auth;