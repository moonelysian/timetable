'use strict';
module.exports = (sequelize, DataTypes) => {
  const memos = sequelize.define('Memos', {
    tableId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
      timestamps: false,
      charset: 'utf8mb4',
      collation: 'utf_general_ci'
  });
  memos.associate = function(models) {
    memos.belongsTo(models.Timetables,{
        foreignKey: 'tableId'
    })
  };
  return memos;
};