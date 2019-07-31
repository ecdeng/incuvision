// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const Experiment = db.Experiment;
const Position = db.Position;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create experiment in DB
router.post('/create', function (req, res) {
  //  TODO: validate experiment here
  
  return Experiment.create({
    experimentId: req.body.experimentId,
    name: req.body.name,
    description: req.body.description
  }).then(function (newExperiment) {
    res.send(newExperiment);
  }).catch((err) => {
    res.send(err);
  });
});

// Update experiment in DB
router.post('/update', function (req, res) {
  return Experiment.update({
    experimentId: req.body.experimentId,
    name: req.body.name,
    description: req.body.description
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

// Get all positions associated with an experiment
router.get("/getPositionsByExperiment", (req, res) => {
	return Position.findAll(
		{
			where: { experimentId: req.params.experimentId },
		}
	)
		.then(function (positions) {
			res.send(positions);
		});
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

module.exports.router = router