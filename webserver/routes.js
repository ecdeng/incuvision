const express = require('express');
const bodyParser = require('body-parser');

const routes = express();

//for handling JSON data in routes
routes.use(bodyParser.json());


routes.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

routes.get('/authCallback', (req, res) => {
    res.send(req.url);
});

routes.get('/test', (req, res) => {
    console.log('/test route requested.');
});

module.exports = routes;