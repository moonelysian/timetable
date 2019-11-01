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
            if (checkData) {
                models.Timetable.create(insertData) 
                .then(result => res.send({ message: '등록되었습니다' }))
            } else {
                res.send({ message: '이미 등록된 과목입니다' });
            }
        }
        checkTable(insertData, callback);
    } catch(err){
        console.log(err);
    }
}

const deleteTable =function(req, res){
    const code = req.params.course_code;
    models.Timetable.destroy({ where: { course_code: code }})
    .then(res => res.redirect('/'))

}

const checkTable = function(insertData, callback){
    models.Timetable.findOne({where: {course_code: insertData.course_code}})
    .then(result => {
        if(result) return false;
        else{
            models.Timetable.findOne({ 
                where: {
                    [Op.and]:[
                        { course_start: insertData.course_start },
                        { course_day: {[Op.like]: "%" + insertData.course_day + "%"} }
                    ],
                    [Op.or]:[
                        
                    ]
                }
            })
            .then(result => {
                console.log(result);
                if(result) return false;
                else return true;
            })
            .then(res => {
                callback(res);
            })
        }
    })
}

module.exports = {
    createTable,
    deleteTable
}