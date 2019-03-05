// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const Position = db.Position;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create position in DB
router.post('/create', function (req, res) {
  return Position.create({
    positionId: req.body.positionId,
		name: req.body.name,
		xPos: req.body.xPos,
    yPos: req.body.yPos,
    zPos: req.body.zPos,
    experimentId: req.body.experimentId
  }).then(function (newPosition) {
    res.send(newPosition);
  }).catch((err) => {
    res.send(err);
  });
});

// Update position in DB
router.post('/update', function (req, res) {
  return Position.update({
    positionId: req.body.positionId,
    name: req.body.name,
		xPos: req.body.xPos,
    yPos: req.body.yPos,
    zPos: req.body.zPos,
    experimentId: experimentId
  },
    {
      where: { positionId: req.body.positionId }
    }
  ).then(function() {
    getById(req.body.positionId).then(function (position) {
      res.send(position);
    });
  })
});

// Get all positions in DB
router.get("/getAll", (req, res) => {
  return Position.findAll()
    .then(function (positions) {
      res.send(positions);
    })
});

// Get a position by positionId
router.get("/getById", (req, res) => {
  getById(req.query.positionId).then(function (position) {
    res.send(position);
  })
});

function getById(positionId) {
  return Position.findOne(
    {
      where: { positionId: positionId },
    }
  );
}

// Associate position with an experiment
router.post("/updateAssociatedExperiment", (req, res) =>{
  return Position.update({
    experimentId: req.body.experimentId,
  },
    {
      where: { positionId: req.body.positionId }
    }
  ).then(function() {
    getById(req.body.positionId).then(function (position) {
      res.send(position);
    });
  }).catch((err) => {
    res.send(err);
  });
});

module.exports.router = router;
