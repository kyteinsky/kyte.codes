'use strict';

const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another/', (req, res) => {
  console.log('yello: ' + req.originalUrl);
  res.json({ route: req.originalUrl })
})
router.post('/yo', (req, res) => {
  res.json({ hello: req.body.data })
  console.log(req.body);
})

app.use(bodyParser.json());
app.use('/.netlify/functions/index', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
