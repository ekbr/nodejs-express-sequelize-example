'use strict';
var validator = require('validator');
module.exports = function(sequelize, DataTypes) {
  var Farmer = sequelize.define('Farmer', {
    username:{
            type: DataTypes.STRING,
            allowNull: false,
    },
    address: DataTypes.STRING,
    // email: {
    //     type: DataTypes.STRING,
    //     validate: {
    //        validator: 'isEmail'
    //     }
    // },
    
    email: { 
       type: DataTypes.STRING,
       unique: true,
       allowNull: false,
       validate: {
            isEmail: { args: true, msg: "not a valid email!" },
            len: { args: [0, 100], msg: "email can't be bigger than 100"},
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
