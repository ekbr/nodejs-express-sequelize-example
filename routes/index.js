var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        var user = req.user;
        if (user !== undefined ){
            user = user.toJSON();
        }
        res.render('index', {title: 'Home', user: user});
    }
});

// show the login form
router.get('/login', function(req, res, next) {
    if(req.isAuthenticated()) res.redirect('/');
    res.render('login', { message: req.flash('loginMessage') });
});

// process the login form
router.post('/login', function(req, res, next) {
   passport.authenticate('local-login', { 
       successRedirect: '/',
       failureRedirect: '/login'
       }, function(err, user, info) {
        if(err) {
            return res.render('login', {title: 'Login',  message: req.flash('loginMessage')});
        };
        return req.logIn(user, function(err) {
            if(err) {
                return res.render('login', {title: 'Login',  message: req.flash('loginMessage')});
            } else {
                return res.redirect('/');
            }
        });
       
   })(req, res, next);
});

// show the signup form
router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    if(req.isAuthenticated()) {
      res.redirect('/');
    } else {
        res.render('users/signup', { message: req.flash('signupMessage') });
    };
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}),function(req, res) {
    console.log(req.user.username+' is successfully logged in.');
    console.log(JSON.stringify(req.user));
    res.redirect('/profile');  
});

/* Profile section */
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('users/profile', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    console.log(req.isAuthenticated(), " *************")
    res.redirect('/login');
});

module.exports = router;

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}
