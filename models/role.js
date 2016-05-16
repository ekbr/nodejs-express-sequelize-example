'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //console.log(models);
        // Role.belongsToMany(models.User, {
        //     // as: 'Users',
        //     through: {
        //         model: models.User_Role
        //     },
        //     foreignKey: 'role_id'
        // });
        
      }
    }
  });
  return Role;
};