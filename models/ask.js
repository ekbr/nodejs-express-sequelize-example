'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ask = sequelize.define('Ask', {
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ask;
};