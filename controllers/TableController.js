const sequelize = require('sequelize')
const models = require('../models')
const Op = sequelize.Op;

const getTable = function(req, res){
    const tableId = parseInt(req.params.tableId);
    models.Timetables.findOne({where: {id: tableId}})
    .then( result => {
        res.send({ course: result })
    })
}

const createTable = function(req, res){
    const body = req.body;
    models.Courses.findOne({where: {code: body.code}})
    .then(data => {
        const insertData = {
            course_code: data.code,
            course_name: data.lecture,
            course_professor: data.professor,
            course_location: data.location,
            course_start: data.start_time,
            course_end: data.end_time,
            course_day: data.dayofweek
        }
        return insertData;
    })
    .then(insertData => {
        try{
            const callback = (checkData) => {
                if (checkData) {
                    models.Timetables.create(insertData) 
                    .then(result => res.send({ message: '등록되었습니다' }))
                } else {
                    res.send({ message: '등록이 불가합니다' });
                }
            }
            checkTable(insertData, callback);
        } catch(err){
            console.log(err);
        }
    })
}

const deleteTable =function(req, res){
    const id = req.params.tableId;
    models.Timetable.destroy({ where: { id: id }})
    .then( result => res.send({message: '삭제되었습니다'}))
}

const checkTable = function(insertData, callback){
    const days = insertData.course_day.split('')
    if (days.length == 1){
        days[1] = days[0];
    }
    console.log(days)
    models.Timetables.findOne({where: {course_code: insertData.course_code}})
    .then(result => {
        if(result) return false;
        else{
            models.Timetables.findOne({ 
                where: {
                    [Op.and]:[
                        { 
                            [Op.or]:[
                                { course_start: { [Op.and]: [ {[Op.gte]: insertData.course_start }, { [Op.lt]: insertData.course_end}] } },
                                { course_end: { [Op.and]: [ {[Op.gt]: insertData.course_start }, { [Op.lte]: insertData.course_end}] } },
                            ]
                        },
                        { course_day: {[Op.or]:[ {[Op.like]: '%'+ days[0] +'%'}, {[Op.like]: '%'+ days[1]+'%'} ]}}
                    ]
                }
            })
            .then(result => {
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
    getTable,
    createTable,
    deleteTable
}