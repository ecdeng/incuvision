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

// Get all jobCommands in DB in order
router.get("/getAll", (req, res) => {
  return JobCommand.findAll({
    order: [
      ['time', 'ASC'],
    ]
  }).then(function (jobCommands) {
      res.send(jobCommands);
    })
});

// Get soonest JobCommand in DB
router.get("/getSoonest", (req, res)=> {
  return JobCommand.min('time').then(min => {})
});

module.exports.router = router