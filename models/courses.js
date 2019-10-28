module.exports = (sequelize, DataTypes) => {
    return sequelize.define('courses', {
        code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        lecture: {
            type: DataTypes.STRING
        },
        professor:{
            type: DataTypes.STRING
        },
        location:{
            type: DataTypes.STRING
        },
        start_time:{
            type: DataTypes.INTEGER
        },
        end_time: {
            type: DataTypes.INTEGER
        },
        dayofweek: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    })
}