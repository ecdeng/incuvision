// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const Experiment = db.Experiment;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create experiment in DB
router.post('/create', function (req, res) {
  /* create a bunch of positions from req.body 
    then create the expereriment below */
  return Experiment.create({
    experimentId: req.body.experimentId,
    name: req.body.name
  }).then(function (newExperiment) {
    req.body.positions.forEach(element => {
      Position.create({
        positionId: element.positionId,
        name: element.name,
        xPos: element.xPos,
        yPos: element.yPos,
        zPos: element.zPos,
        experimentId: newExperiment.experimentId
      }).then(function (newPosition) {
        res.send(newPosition);
      }).catch((err) => {
        res.send(err);
      });
    });
    res.send(newExperiment);
  }).catch((err) => {
    res.send(err);
  });
});

// Update experiment in DB
router.post('/update', function (req, res) {
  return Experiment.update({
    experimentId: req.body.experimentId,
    name: req.body.name
  },
    {
      where: { experimentId: req.body.experimentId }
    }
  ).then(function() {
    getById(req.body.experimentId).then(function (experiment) {
      res.send(experiment);
    });
  })
});

// Get all experiments in DB
router.get("/getAll", (req, res) => {
  return Experiment.findAll()
    .then(function (experiments) {
      res.send(experiments);
    })
});

// Get an experiment by experimentId
router.get("/getById", (req, res) => {
  getById(req.query.experimentId).then(function (experiment) {
    res.send(experiment);
  })
});

function getById(experimentId) {
  return Experiment.findOne(
    {
      where: { experimentId: experimentId },
    }
  );
}

module.exports.router = router;
