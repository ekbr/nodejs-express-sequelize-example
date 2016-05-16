'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Role = sequelize.define('User_Role', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User_Role;
};