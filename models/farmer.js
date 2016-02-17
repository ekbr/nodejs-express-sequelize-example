'use strict';
var validator = require('validator');
module.exports = function(sequelize, DataTypes) {
  var Farmer = sequelize.define('Farmer', {
    username:{
            type: DataTypes.STRING,
            allowNull: false,
    },
    address: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
           validator: 'isEmail'
        }
    },
    phone:{
            type: DataTypes.STRING,
            allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
          Farmer.hasMany(models.Task);
        // associations can be defined here
      }
    }
  });
  return Farmer;
};
