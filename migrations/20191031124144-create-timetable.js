'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Timetable', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_start:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      course_day:{
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Timetable');
  }
};
