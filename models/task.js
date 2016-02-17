'use strict';
var Farmer  = require('./farmer');
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    deadline: DataTypes.DATE,
    description: DataTypes.TEXT,
    FarmerId: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: Farmer,
            // This is the column name of the referenced model
            key: 'id'
        }
    }
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