'use strict';

module.exports = {
  up: queryInterface => queryInterface.sequelize.query(`
  CREATE TABLE IF NOT EXISTS Courses (
    code VARCHAR(225) CHARACTER SET utf8,
    lecture VARCHAR(225) CHARACTER SET utf8,
    professor VARCHAR(225) CHARACTER SET utf8,
    location VARCHAR(225) CHARACTER SET utf8,
    start_time INT,
    end_time INT,
    dayofweek VARCHAR(225) CHARACTER SET utf8
  );`)
  ,
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Courses');
  }
};
