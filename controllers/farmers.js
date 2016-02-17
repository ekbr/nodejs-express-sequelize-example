var path = require("path");
var Farmer = require(path.join(__dirname, '..', '/models/farmer.js'));

/*
 * GET farmers listing.
 */

module.exports.list = function(req, res){

    // find multiple entries
    Farmer.findOne({
        where: {
            name: 'a project'}
    }).success(function(err, rows) {
        if (err) throw err;
        res.render('farmers/farmers',{page_title:"Farmers",data:rows});
    // Do something with clientProjectUsers.
    // Which has the client, its projects, and its users.
  });

    // Farmer.list(function (err, rows) {
    //     if (err) throw err;
    //     console.log(rows);
    //     res.render('farmers/farmers',{page_title:"Farmers - Node.js",data:rows});
    // }); 
};
