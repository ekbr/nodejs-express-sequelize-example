'use strict';
var Farmer  = require('./farmer');
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    deadline: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
          Task.belongsTo(models.Farmer, { foreignKey: 'FarmerId', foreignKeyConstraint:true });
        // associations can be defined here
      }
    }
  });
  return Task;
};