var config = require('../config/config');
var mongoose = require('mongoose');
var express = require('express');
var app         = express();
var userRouter  = express.Router();
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var config = require('../config/config');

exports.check =  (req, res, next) => {
  if(req.body.email == config.adminEmail && req.body.password == config.adminPassword){
    req.body.isAdmin = true;
    next();
  }
  else {
    next();
  }
}
