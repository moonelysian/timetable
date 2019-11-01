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
        const callback = (checkData) => {
            console.log(checkData)
            if (checkData) {
                models.Timetable.create(insertData) 
                .then(result => res.redirect('/'))
            } else {
                res.send({ message: '이미 등록된 과목입니다' });
            }
        }
        checkTable(insertData, callback);
    } catch(err){
        console.log(err);
    }
}

const checkTable = function(insertData){
    models.Timetable.findOne({where: {course_code: insertData.course_code}})
    .then(result => {
        if(result) return false;
        else{
            models.Timetable.findOne({ 
                where: {
                    [Op.and]:[
                        { course_start: insertData.course_start },
                        { course_day: {[Op.like]: "%" + insertData.course_day + "%"} }
                    ]
                }
            })
            .then(result => {
                console.log(result);
                if(result) return false;
                else return true;
            })
        }
    })
}

module.exports = {
    createTable
}