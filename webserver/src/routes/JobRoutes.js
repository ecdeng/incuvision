// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const Job = db.Job;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create job in DB
router.post('/create', function (req, res) {
  // TODO: validate job here
  
  return Job.create({
        jobId: req.body.jobId,
        name: req.body.name,
        frequency: req.body.frequency,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        experimentId: req.body.experimentId
      }).then(function (newJob) {
        time = 0;
        req.body.positions.forEach(element => {
          Position.create({
            positionId: element.positionId,
            name: element.name,
            xPos: element.xPos,
            yPos: element.yPos,
            zPos: element.zPos,
            jobId: newJob.jobId,
            experimentId: newJob.experimentId
          }).then(function (newPosition) {
            res.send(newPosition);
          }).catch((err) => {
            res.send(err);
          });
        });

        // Creating job commands here
        createJobCommands(newJob.jobId);

        // Setting timer for soonest job here
        var soonestMove = JobCommand.min('time').then(min => {});
        var timeTillMove = soonestMove - Date.now();
        setTimeout(function() { JobCommand.callMove(); }, timeTillMove);

        res.send(newJob);
      }).catch((err) => {
        res.send(err);
    });
});

// Update job in DB
router.post('/update', function (req, res) {
  return Job.update({
    jobId: req.body.jobId,
    name: req.body.name,
    frequency: req.body.frequency,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    experimentId: req.body.experimentId
  },
    {
      where: { jobId: req.body.jobId }
    }
  ).then(function() {
    getById(req.body.jobId).then(function (job) {
      res.send(job);
    });
  })
});

// Get all jobs in DB
router.get("/getAll", (req, res) => {
  return Job.findAll()
    .then(function (jobs) {
      res.send(jobs);
    })
});

// Get a job by jobId
router.get("/getById", (req, res) => {
  getById(req.query.jobId).then(function (job) {
    res.send(job);
  })
});

function getById(jobId) {
  return Job.findOne(
    {
      where: { jobId: jobId },
    }
  );
}

function createJobCommands(jobId) {
  var curr = getById(jobId);
  var time = startDate.getTime();
  var numPositions;

  while(time < endDate.getTime()) {
    numPositions = 0;
    
    curr.getPositions().forEach(elem =>  {
      JobCommand.create({
        time: time,
        positionId: elem.positionId
      }).then(function (newJobCommand){
        res.send(newJobCommand);
      }).catch((err) => {
        res.send(err);
      });

      time += 60000; // incrementing time by 1 minute
      numPositions++;
    });

    time += ((curr.frequency * 60)-numPositions)*60000;
  }
}

module.exports.router = router