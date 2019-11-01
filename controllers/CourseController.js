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

const getSearchData = function(req, res){
    let inputData = req.query.q;
    if (inputData != undefined){
        models.Courses.findAll({
            where:{
                [Op.or]:[
                    { code: { [Op.like]: "%" + inputData + "%" } },
                    { lecture: { [Op.like]: "%" + inputData + "%" } },
                    { professor:{ [Op.like]: "%" + inputData + "%" } },
                ]
            }
        })
        .then(searchData => {
            console.log(searchData);
            res.send({ searchData: searchData });
        })
    }
}

module.exports = {
    getCourse,
    getSearchData
}