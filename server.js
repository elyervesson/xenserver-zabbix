'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  path = require('path'),
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Zabbixdb');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookies
app.use(cookieParser());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.cookies && req.cookies.authorization && req.cookies.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.cookies.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      else {
        req.user = decode;
        res.cookie("token", jwt.sign({ userName: user.userName, email: user.email, fullName: user.firstName +" "+ user.lastName }, 'RESTFULAPIs'));
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

/*
  app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });
*/

app.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;