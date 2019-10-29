'use strict';
module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define('table', {
    code: DataTypes.STRING
  }, {
    timestamps: false
  });
  table.associate = function(models) {
    // associations can be defined here
  };
  return table;
};