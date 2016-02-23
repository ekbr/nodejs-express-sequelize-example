var express = require('express');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User  = require('../models/user');