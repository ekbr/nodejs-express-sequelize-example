var express = require('express');
var models  = require('../models');

module.exports.list = function(req, res){
  models.Task.findAll({ include: [ models.Farmer ] }).then(function(rows) {
    res.render('tasks/list', {page_title: "Tasks", data:rows});
  });
}

module.exports.add = function(req, res){
   var farmers = {};
   models.Farmer.findAll().then(function(rows){
       farmers = rows;
       console.log('*********',farmers[0].username);
       res.render('tasks/new',{page_title:"Add Farmer", data: farmers});
   });
   //res.render('tasks/new',{page_title:"Add Farmer", data: farmers});
};

/*Save the task*/
module.exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        title : input.title,
        description : input.description,
        deadline   : input.deadline,
        FarmerId   : input.FarmerId 
    };
    models.Task.create({ title: data.title, description: data.description, deadline: data.deadline, FarmerId: data.FarmerId }).then(function(err) {
        console.log("Error inserting : %s ",err );
    })
    res.redirect('/tasks');
};

module.exports.edit = function(req, res){
	var id = req.params.id;
    var farmers = {};
    models.Task.find({where: {id: id}}).then(function(row, err){
        if (err) console.log("Error Selecting : %s ",err );
        models.Farmer.findAll().then(function(rows){
            farmers = rows;
            res.render('tasks/edit',{page_title:"Edit Task", data:row, farmers:farmers});
        });
    });
};

module.exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    //console.log('********', id);
    var data = {
        title : input.title,
        description : input.description,
        deadline   : input.deadline,
        FarmerId   : input.FarmerId 
    };
    
    models.Task.find({ where: {id: id} }).on('success', function(task) {
        if (task) { // if the record exists in the db
            task.updateAttributes({
                title : data.title,
                description : data.description,
                deadline   : data.deadline,
                FarmerId   : data.FarmerId
            }).success(function() {
                res.redirect('/tasks');
            }).catch(function(e) {
                console.log("Task update failed! %s", e);
            });
        }
    })
};

module.exports.delete = function(req, res){
	var id = req.params.id;
     models.Task.destroy({
        where: {
            id: id
        }
     }).success(function() {
        res.redirect('/tasks');
     }).catch(function(e) {
        console.log("Task destroy failed! %s", e);
     });
};


// ###### RESTFULL APIS FOR TASKS

module.exports.api_tasks = function(req,res){
  models.Task.findAll({ include: [ models.Farmer ] }).then(function(rows) {
    //res.render('tasks/list', {page_title: "Tasks", data:rows});
    res.send(JSON.stringify(rows));
  });
};

module.exports.api_task = function(req, res){
	var id = req.params.id;
    models.Task.find({where: {id: id}}).then(function(row, err){
        res.send(JSON.stringify(row));
    });
};

