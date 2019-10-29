'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('memo', {
        course_code: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING
        },
        content:{
            type: DataTypes.STRING
        },
    },
    {
        timestamps: false
    })
}