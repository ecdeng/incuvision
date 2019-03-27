// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const JobCommand = db.JobCommand;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create jobCommand in DB
router.post('/create', function (req, res) {
  return JobCommand.create({
        time: req.body.time,
        positionId: req.body.positionId
      }).then(function (newJobCommand) {
        res.send(newJobCommand);
      }).catch((err) => {
        res.send(err);
    });
});

// Get all jobCommands in DB
router.get("/getAll", (req, res) => {
  return JobCommand.findAll()
    .then(function (jobCommands) {
      res.send(jobCommands);
    })
});

// Sort jobCommands

// Delete jobCommand by time / position combo

module.exports.router = router