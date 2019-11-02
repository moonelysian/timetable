'use strict';
module.exports = (sequelize, DataTypes) => {
  const timetables = sequelize.define('Timetables', {
    course_code: DataTypes.STRING,
    course_name: DataTypes.STRING,
    course_professor: DataTypes.STRING,
    course_location: DataTypes.STRING,
    course_start: DataTypes.INTEGER,
    course_end: DataTypes.INTEGER,
    course_day: DataTypes.STRING,

  }, {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
  timetables.associate = function(models) {
    timetables.hasMany(models.Memos);
  };
  return timetables;
};