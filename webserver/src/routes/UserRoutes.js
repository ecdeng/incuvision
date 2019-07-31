// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const crypto = require('crypto');

// User-created imports
const db = require('../DBManager');
const User = db.User;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create user in DB
router.post('/create', function (req, res) {
  const pwdMeta = generatePassword(req.body.password);
  return User.create({
    userId: req.body.userId,
    username: req.body.username,
    salt: pwdMeta.salt,
    hash: pwdMeta.hash,
    email: req.body.email
  }).then(function (newUser) {
    res.send(newUser);
  }).catch((err) => {
    res.send(err);
  });
});

// Update user in DB
router.post('/update', function (req, res) {
  const pwdMeta = generatePassword(req.body.password);
  return User.update({
    userId: req.body.userId,
    username: req.body.username,
    salt: pwdMeta.salt,
    hash: pwdMeta.hash,
    email: req.body.email
  },
    {
      where: { userId: req.body.userId }
    }
  ).then(function() {
    getById(req.body.userId).then(function (user) {
      res.send(user);
    });
  })
});

// Get all users in DB
router.get("/getAll", (req, res) => {
  return User.findAll()
    .then(function (users) {
      res.send(users);
    })
});

// Get a user by userId
router.get("/getById", (req, res) => {
  getById(req.query.userId).then(function (user) {
    res.send(user);
  })
});

// Generate appropriate hash and salt for given password
function generatePassword(password) {
  let salt = crypto.randomBytes(16).toString('hex');
  return {
    salt: salt,
    hash: crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
  }
}

function validatePassword(salt, hash, password) {
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return genHash === hash;
}

// Call callback function with null for error and the result of validatePassword, or alternatively 
// with the error getByUsername provides.
function isValidPassword(username, password, cb) {
  getByUsername(username)
    .then((user) => {
      let isValid = validatePassword(user.salt, user.hash, password);
      if (isValid) cb(null, true);
      else cb(null, false);
    })
    .catch((err) => {
      cb(err, null);
    })
}

function getById(userId) {
  return User.findOne(
    {
      where: { userId: userId },
    }
  );
}

function getByUsername(username) {
  return User.findOne(
    {
      where: { username: username },
    }
  );
}

module.exports.router = router;
module.exports.methods = { getByUsername, getById, isValidPassword, validatePassword };
