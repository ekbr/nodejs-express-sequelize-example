'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn('Farmers', 'address', {type: Sequelize.STRING, allowNull: false})
      queryInterface.addColumn('Farmers', 'phone', {type: Sequelize.STRING, allowNull: false})
      queryInterface.addColumn('Farmers', 'email', {type: Sequelize.STRING})
  },

  down: function (queryInterface, Sequelize) {
  }
};
