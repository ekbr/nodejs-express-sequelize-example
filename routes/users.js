var express = require('express');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');

/** List Roles */
module.exports.list = function(req, res){
  models.Role.findAll({}).then(function(rows) {
    res.render('users/roles', {page_title: "Roles", data:rows, message: req.flash('message')});
  });
}

module.exports.add = function(req, res){
   var farmers = {};
   models.Farmer.findAll().then(function(rows){
       farmers = rows;
       res.render('roles/new',{page_title:"Add Role", message: req.flash('roleAdd')});
   });
   //res.render('tasks/new',{page_title:"Add Farmer", data: farmers});
};