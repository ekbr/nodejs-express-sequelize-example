var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');

//#### JSON OPERATION
var contents = fs.readFileSync("./tmp/data.json");
var jsonContent = JSON.parse(contents);
// Get Value from JSON
 console.log("User Name:", jsonContent.username);
 console.log("Email:", jsonContent.email);
 console.log("Password:", jsonContent.password);

//########

var home = require('./routes/index');
var farmers = require('./routes/farmers');
var tasks = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);

app.get('/farmers', farmers.list);//all farmers
app.get('/farmers/add', farmers.add);//route add farmer
app.post('/farmers/add', farmers.save);//route add farmer
app.get('/farmers/edit/:id', farmers.edit);
app.get('/farmers/:id', farmers.show);
app.post('/farmers/edit/:id', farmers.save_edit);
app.get('/farmers/delete/:id', farmers.delete);
app.get('/farmers/:id/tasks', farmers.tasks);

// ###### RESTFULL APIS FOR FARMERS
app.get('/api/farmers', farmers.api_farmers);
app.get('/api/farmers/:id', farmers.api_farmer);
// ######

app.get('/tasks', tasks.list);//all tasks
app.get('/tasks/add', tasks.add);//route add tasks
app.post('/tasks/add', tasks.save);//route add tasks
app.get('/tasks/edit/:id', tasks.edit);
app.post('/tasks/edit/:id', tasks.save_edit);
app.get('/tasks/delete/:id', tasks.delete);


// ###### RESTFULL APIS FOR TASKS
app.get('/api/tasks', tasks.api_tasks);
app.get('/api/tasks/:id', tasks.api_task);
// ######

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
