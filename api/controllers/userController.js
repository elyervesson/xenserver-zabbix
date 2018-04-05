'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(
    function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
  });
};

exports.sign_in = function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) throw err;

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    const token = jwt.sign({
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      exp: (Date.now()/1000)+60*60*24*7,
    }, 'RESTFULAPIs')
    res.header("token", token);
    return res.json({ Succeeded: true })
  });
};

exports.get_user_claims = function(req, res) {
  return res.json(req.user);
};

exports.update_user = function(req, res) {
  if (req.body.password != null) {
    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
  }

  User.findOneAndUpdate({email: req.body.email}, {$set: req.body}, {new: true}, function(err, user){
      if (err) {
        return res.status(400).send({message: err});
      } else {
        user.hash_password = undefined;
        user.Succeeded = true;

        const token = jwt.sign({
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          exp: (Date.now()/1000)+60*60*24*7,
        }, 'RESTFULAPIs')
        res.header("token", token);
        return res.json(user);
      }
    });
}

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
