'use strict';
module.exports = (sequelize, DataTypes) => {
  const timetable = sequelize.define('Timetable', {
    course_code: DataTypes.STRING,
    course_start: DataTypes.INTEGER,
    course_day: DataTypes.STRING
  }, {
      timestamps: false
  });
  timetable.associate = function(models) {
    timetable.hasMany(models.Memo);
  };
  return timetable;
};