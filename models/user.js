'use strict';
var bcrypt   = require('bcrypt-nodejs');
// var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
   username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
			notEmpty: true,
			len: [1,50]
		}
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
			  len: [8, Infinity]
          }
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: { args: true, msg: "not a valid email!" },
            //notEmpty: true,
            //len: { args: [1, 100], msg: "email can't be bigger than 100"},
        } 
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User.belongsToMany(models.Role, {
        //     through: {
        //         model: models.User_Role
        //     },
        //     foreignKey: 'user_id'
        // });
      }
    }
  });
  
  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  User.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  };
  return User;
};