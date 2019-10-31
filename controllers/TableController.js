const sequelize = require('sequelize')
const models = require('../models')

const createTable = function(req, res){
    const body = req.body;
    console.log(body);
    models.Timetable.create({course_code: body.code})
    .then(result => {
        res.redirect('/')
    })
}

module.exports = {
    createTable
}