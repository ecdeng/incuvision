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
    return Job.create({
        jobId: req.body.jobId,
        name: req.body.name,
        experimentId: req.body.experimentId
      }).then(function (newJob) {
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
    experimentId: req.body.experimentId
  },
    {
      where: { jobtId: req.body.jobId }
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

module.exports.router = router