'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      femalePopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      malePopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sumPopulation: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      parentLocation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LocationDetails');
  }
};