'use strict';
module.exports = (sequelize, DataTypes) => {
  const memo = sequelize.define('memo', {
    tableId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  memo.associate = function(models) {
    memo.belongsTo(models.timetable,{
        foreignKey: 'tableId'
    })
  };
  return memo;
};