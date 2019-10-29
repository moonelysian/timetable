'use strict';
module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lecture: DataTypes.STRING,
    professor: DataTypes.STRING,
    location: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    dayofweek: DataTypes.STRING
  }, {
    timestamps: false
  });
  courses.associate = function(models) {
    // associations can be defined here
  };
  return courses;
};



