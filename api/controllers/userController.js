const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('../models/userModel');

const User = mongoose.model('User');

function register(req, res) {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    }
    user.hash_password = undefined;
    return res.json(user);
  });
}

function signIn(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    const token = jwt.sign({
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      exp: (Date.now() / 1000) + 60 * 60 * 24 * 7,
    }, 'RESTFULAPIs');
    res.header('token', token);
    return res.json({ Succeeded: true });
  });
}

function getUserClaims(req, res) {
  return res.json(req.user);
}

function updateUser(req, res) {
  if (req.body.password != null) {
    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
  }

  User.findOneAndUpdate({ email: req.body.email }, { $set: req.body }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    user.hash_password = undefined;
    user.Succeeded = true;

    const token = jwt.sign({
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      exp: (Date.now() / 1000) + 60 * 60 * 24 * 7,
    }, 'RESTFULAPIs');
    res.header('token', token);
    return res.json(user);
  });
}

function loginRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}

module.exports = {
  register,
  signIn,
  getUserClaims,
  updateUser,
  loginRequired,
};
