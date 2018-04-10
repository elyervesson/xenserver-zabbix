const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const routes = require('./api/routes/routes');

const port = process.env.PORT || 3000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Zabbixdb');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
      if (err) req.user = undefined;
      else {
        delete decode.iat;
        decode.exp = (Date.now() / 1000) + 60 * 60 * 24 * 7;
        const token = jsonwebtoken.sign(decode, 'RESTFULAPIs');

        const decoded = jsonwebtoken.decode(token);
        req.user = decoded;

        res.header('token', token);
      }

      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

routes.appRoutes(app);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`Running on localhost:${port}`));

module.exports = app;
