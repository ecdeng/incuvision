// NPM imports
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// User-created imports
const db = require('../DBManager');
const Image = db.Image;

router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

// Create image in DB
router.post('/create', function (req, res) {
  return Image.create({
    imageId: req.body.imageId,
		name: req.body.name,
		timestamp: req.body.timestamp,
		filepath: req.body.filepath
  }).then(function (newImage) {
    res.send(newImage);
  }).catch((err) => {
    res.send(err);
  });
});

// Update image in DB
router.post('/update', function (req, res) {
  return Image.update({
    imageId: req.body.imageId,
    name: req.body.name,
		timestamp: req.body.timestamp,
		filepath: req.body.filepath
  },
    {
      where: { imageId: req.body.imageId }
    }
  ).then(function() {
    getById(req.body.imageId).then(function (image) {
      res.send(image);
    });
  })
});

// Get all images in DB
router.get("/getAll", (req, res) => {
  return Image.findAll()
    .then(function (images) {
      res.send(images);
    })
});

// Get an image by imageId
router.get("/getById", (req, res) => {
  getById(req.query.imageId).then(function (image) {
    res.send(image);
  })
});

function getById(imageId) {
  return Image.findOne(
    {
      where: { imageId: imageId },
    }
  );
}

module.exports.router = router;
