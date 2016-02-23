'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
			notEmpty: true,
			len: [1,50]
		}
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
			  len: [8, Infinity]
          }
      },
      email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: { args: true, msg: "not a valid email!" },
            notEmpty: true,
            len: { args: [1, 100], msg: "email can't be bigger than 100"},
        } 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};