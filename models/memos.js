'use strict';
module.exports = (sequelize, DataTypes) => {
  const memos = sequelize.define('Memos', {
    tableId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
  memos.associate = function(models) {
    memos.belongsTo(models.Timetables,{
        foreignKey: 'tableId'
    })
  };
  return memos;
};