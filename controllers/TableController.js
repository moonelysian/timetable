const sequelize = require('sequelize')
const models = require('../models')

const createTable = function(req, res){
    console.log(req);
    //checkTable(body.code)
    try{
        models.Timetable.create({course_code: body.code})
        .then(result => {
            res.redirect('/')
        })
    }catch(err){
        console.log(err)
    }
    
}

// const checkTable = function(code){
//     models.findOne({where: {course_code: code}})
//     .then(result => {
//         if(!result){
//             const message='이미 등록된 과목입니다.'
//             return message
//         }
//     })
// }

module.exports = {
    createTable
}