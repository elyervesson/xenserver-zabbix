'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  path = require('path'),
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Zabbixdb');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      else {
        delete decode.iat;
        const token = jsonwebtoken.sign({ data: decode, exp: (Date.now()/1000)+60*60*24*7 } , 'RESTFULAPIs');

        const decoded = jsonwebtoken.decode(token);
        req.user = decoded

        res.header("token", token);
      }

      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

var routes = require('./api/routes/routes');
routes(app);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;