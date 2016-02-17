'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          Task.belongsTo(models.Farmer);
        // associations can be defined here
      }
    }
  });
  return Task;
};