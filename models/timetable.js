'use strict';
module.exports = (sequelize, DataTypes) => {
  const timetable = sequelize.define('Timetable', {
    course_code: DataTypes.STRING
  }, {});
  timetable.associate = function(models) {
    timetable.hasMany(models.memo);
  };
  return timetable;
};