// var express = require('express');
// var home = express.Router();

// /* GET home page. */
// home.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports.home = home;


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;