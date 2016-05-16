var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var fs = require('fs');

require('./config/passport')(passport); // pass passport for configuration

//#### JSON OPERATION
var contents = fs.readFileSync("./tmp/data.json");
var jsonContent = JSON.parse(contents);
// Get Value from JSON
//  console.log("User Name:", jsonContent.username);
//  console.log("Email:", jsonContent.email);
//  console.log("Password:", jsonContent.password);

//########

var home = require('./routes/index');
var farmers = require('./routes/farmers');
var tasks = require('./routes/tasks');
var users = require('./routes/users');

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
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge: 3600000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

function IsAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
     return next();
  res.redirect("/");
};

app.use('/', home);

app.get('/roles', IsAuthenticated, users.list);

app.get('/farmers', IsAuthenticated, farmers.list);//all farmers
app.get('/farmers/add', IsAuthenticated, farmers.add);//route add farmer
app.post('/farmers/add', IsAuthenticated, farmers.save);//route add farmer
app.get('/farmers/edit/:id', IsAuthenticated, farmers.edit);
app.get('/farmers/:id', IsAuthenticated, farmers.show);
app.post('/farmers/edit/:id', IsAuthenticated, farmers.save_edit);
app.get('/farmers/delete/:id', IsAuthenticated, farmers.delete);
app.get('/farmers/:id/tasks', IsAuthenticated, farmers.tasks);

// ###### RESTFULL APIS FOR FARMERS
app.get('/api/farmers', farmers.api_farmers);
app.get('/api/farmers/:id', farmers.api_farmer);
// ######

app.get('/tasks', IsAuthenticated, tasks.list);//all tasks
app.get('/tasks/add', IsAuthenticated, tasks.add);//route add tasks
app.post('/tasks/add', IsAuthenticated, tasks.save);//route add tasks
app.get('/tasks/edit/:id', IsAuthenticated, tasks.edit);
app.post('/tasks/edit/:id', IsAuthenticated, tasks.save_edit);
app.get('/tasks/delete/:id', IsAuthenticated, tasks.delete);

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
