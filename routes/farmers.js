var express = require('express');

var models  = require('../models');

module.exports.list = function(req, res){
  models.Farmer.findAll({}).then(function(rows) {
     models.Farmer.findAll({ include: [ models.Task ] }).then(function(farmers) {
        //console.log(JSON.stringify(farmers))
     });
    res.render('farmers/farmers', {page_title: "Farmers", data:rows, message: req.flash('message')});
  });; 
}

module.exports.add = function(req, res){
  res.render('farmers/new',{page_title:"Add Farmer", message: req.flash('farmerAdd')});
};

/*Save the farmer*/
module.exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        username : input.username,
        address : input.address,
        email   : input.email,
        phone   : input.phone 
    };
    
    models.Farmer.create({
         username: data.username,
         address: data.address,
         email: data.email,
         phone: data.phone 
    }).then(function(){
        //do something when Farmer is created
        res.redirect('/farmers');
    }).catch(function(err){
        console.log(err);
        req.flash('farmerAdd', err.errors.map(error => error.message))
        res.render('farmers/new', {message: req.flash('farmerAdd')});
        //do something when you get error
        //you could check if this is validation error or other error
    });
};

module.exports.edit = function(req, res){
	var id = req.params.id;
    models.Farmer.find({where: {id: id}}).then(function(row, err){
        if (err) console.log("Error Selecting : %s ",err );
        res.render('farmers/edit',{page_title:"Edit Farmer", data:row, message: req.flash('farmerEdit')});
    });
};

module.exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var data = {
        username    : input.username,
        address : input.address,
        email   : input.email,
        phone   : input.phone 
    };
    models.Farmer.find({ where: {id: id} }).on('success', function(farmer) {
        if (farmer) { // if the record exists in the db
            farmer.updateAttributes({
                username: data.username,
                address: data.address,
                email: data.email,
                phone: data.phone
            }).success(function() {
                res.redirect('/farmers');
            }).catch(function(err) {
                console.log("Farmer update failed! %s", err);
                req.flash('farmerEdit', err.errors.map(error => error.message));
                res.render('farmers/edit',{page_title:"Edit Farmer", data:farmer, message: req.flash('farmerEdit')});
            });
        }
    })
};

module.exports.delete = function(req, res){
	var id = req.params.id;
     models.Farmer.destroy({
        where: {
            id: id
        }
     }).success(function() {
        req.flash('message', 'Farmer is successfully deleted!');
        res.redirect('/farmers');
     }).catch(function(e) {
        console.log("Farmer destroy failed! %s", e);
        req.flash('message', e);
        res.redirect('/farmers');
     });
};

module.exports.show = function(req, res){
	var id = req.params.id;
    models.Farmer.find({where: {id: id}}).then(function(row, err){
        if (err) console.log("Error Selecting : %s ",err );
        res.render('farmers/show',{page_title:"Show Farmer", data:row});
    });
};

module.exports.tasks = function(req, res){
    var id = req.params.id;
    models.Farmer.find({ include: [ models.Task ], where: {id: id} }).then(function(farmer) {
        res.render('farmers/tasks', {page_title: "Farmer Tasks", data:farmer, tasks: farmer.Tasks});
     })
     //res.redirect('/farmers');
};

// ###### RESTFULL APIS FOR FARMERS

module.exports.api_farmers = function(req,res){
  models.Farmer.findAll({ include: [ models.Task ] }).then(function(rows) {
    res.send(JSON.stringify(rows));
  });
};

module.exports.api_farmer = function(req, res){
	var id = req.params.id;
    models.Farmer.find({where: {id: id}, include: [ models.Task ]}).then(function(row, err){
       // res.send(JSON.stringify(row));
        res.json(row);
    });
};



