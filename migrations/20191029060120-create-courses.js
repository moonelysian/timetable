'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Courses', {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      lecture: {
        type: Sequelize.STRING
      },
      professor:{
        type: Sequelize.STRING
      },
      location:{
        type: Sequelize.STRING
      },
      start_time:{
        type: Sequelize.STRING
      },
      course_start:{
        type: Sequelize.INTEGER
      },
      end_time:{
        type: Sequelize.INTEGER
      },
      dayofweek:{
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Courses');
  }
};
