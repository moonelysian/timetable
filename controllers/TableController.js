const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const createTable = function(req, res){
    const body = req.body;
    const course_start = parseInt(body.course_start)
    const insertData = {
        course_code: body.code,
        course_start: course_start,
        course_day: body.course_day
    }
    try{
        if(checkTable(insertData)){
            models.Timetable.create(insertData) 
            .then(result => res.redirect('/'))
        }
        else{
            console.log('AAAAAAA')
            res.send({ message: '이미 등록된 과목입니다' });
        }
    }catch(err){
        console.log(err)
    }
}

let checkTable = function(insertData){
    models.Timetable.findOne({where: {course_code: insertData.course_code}})
    .then(result => {
        if(result){
            return false;
        }
        else{
            models.Courses.findOne({where: {
                [Op.and]:[
                    {
                        start_time: insertData.course_start
                    },
                    {
                        dayofweek: {[Op.like]: "%" + insertData.course_day + "%"}
                    }
                ]
            }})
            .then(result => {
                if(result.code == insertData.course_code) return false;
                else return true;
            })
        }
    })
}

module.exports = {
    createTable
}