var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var models = require('../models');
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
        res.render('index', {title: 'Home', user: user, message:''});
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

// show the change-password form
router.get('/change_password', function(req, res, next) {
    if(req.isAuthenticated()){
           res.render('users/change_password', { message: req.flash('changepasswordMessage') }); 
    } else {
        res.redirect('/');
    };
});

router.post('/change_password', function(req, res, next){
    var currentPass = req.body.currentPass;
    var newPass = req.body.newPass;
    var RetypeNewPass = req.body.RetypeNewPass;
    var newHashPass = '';
    var currentUserID = req.session.passport.user;
    
    models.User.find({where: {id: currentUserID}}).then(function(row, err){
        if(bcrypt.compareSync(currentPass, row.password)){
            if ( newPass == RetypeNewPass) {
                newHashPass =  bcrypt.hashSync(RetypeNewPass, null, null);
                row.updateAttributes({
                    password: newHashPass
                }).success(function() {
                    res.render('index', {message: 'Your password is successfully updated!'});
                }).catch(function(err) {
                    console.log(err);
                    res.render('users/change_password', {message: req.flash('changepasswordMessage')});
                });
            } else {
                res.render('users/change_password', {message: 'New password and retype new password are not matching!!'});
            };
        } else {
           res.render('users/change_password', {message: 'Current Password is wrong!'});
        };
    });
});


module.exports = router;

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}
