var express = require('express');
var models  = require('../models');

module.exports.list = function(req, res){
  models.Task.findAll({ include: [ models.Farmer ] }).then(function(rows) {
    res.render('tasks/list', {page_title: "Tasks", data:rows, message: req.flash('message')});
  });
}

module.exports.add = function(req, res){
   var farmers = {};
   models.Farmer.findAll().then(function(rows){
       farmers = rows;
       res.render('tasks/new',{page_title:"Add Farmer", data: farmers, message: req.flash('taskAdd')});
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
        req.flash('message', 'Task is successfully created.');
        res.redirect('/tasks'); 
    }).catch(function(err){
        console.log("Error inserting : %s ",err );
        models.Farmer.findAll().then(function(rows){
            req.flash('taskAdd', err.errors.map(error => error.message))
            res.render('tasks/new',{page_title:"Add Farmer", data: rows, message: req.flash('taskAdd')});
        });
    });

};

module.exports.edit = function(req, res){
	var id = req.params.id;
    var farmers = {};
    models.Task.find({where: {id: id}}).then(function(row, err){
        if (err) console.log("Error Selecting : %s ",err );
        models.Farmer.findAll().then(function(rows){
            farmers = rows;
            res.render('tasks/edit',{page_title:"Edit Task", data:row, farmers:farmers, message: req.flash('taskEdit')});
        });
    });
};

module.exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var data = {
        title : input.title,
        description : input.description,
        deadline   : input.deadline,
        FarmerId   : input.FarmerId 
    };
    
    models.Task.find({ where: {id: id} }).on('success', function(task) {
        if (task) {
            task.updateAttributes({
                title : data.title,
                description : data.description,
                deadline   : data.deadline,
                FarmerId   : data.FarmerId
            }).then(function() {
                req.flash('message', 'Task is successfully updated.');
                res.redirect('/tasks');
            }).catch(function(err) {
                console.log("Task update failed! %s", err);
                models.Farmer.findAll().then(function(farmers){
                    req.flash('taskEdit', err.errors.map(error => error.message));
                    res.render('tasks/edit',{page_title:"Edit Task", data:task, farmers:farmers, message: req.flash('taskEdit')});
                });
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
        req.flash('message', 'Task is successfully deleted!');
        res.redirect('/tasks');
     }).catch(function(e) {
         console.log("Task destroy failed! %s", e);
         req.flash('message', e)
         res.redirect('/tasks');
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

