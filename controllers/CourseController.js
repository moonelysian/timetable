const sequelize = require('sequelize')
const models = require('../models')

const Op = sequelize.Op;

const getCourse = function(req, res){
    const code = req.params.code;
    models.Courses.findOne( {where: {code: code}} )
    .then( course => {
        res.send( { course: course } );
    });
}

module.exports = {
    getCourse
}