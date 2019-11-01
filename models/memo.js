'use strict';
module.exports = (sequelize, DataTypes) => {
  const memo = sequelize.define('Memo', {
    tableId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  memo.associate = function(models) {
    memo.belongsTo(models.Timetable,{
        foreignKey: 'tableId'
    })
  };
  return memo;
};