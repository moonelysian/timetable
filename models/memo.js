'use strict';
module.exports = (sequelize, DataTypes) => {
  const memo = sequelize.define('memo', {
    course_code: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  memo.associate = function(models) {
    // associations can be defined here
  };
  return memo;
};