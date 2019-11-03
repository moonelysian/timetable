const { Router } = require('express');
const models = require('../models');         
const courses = require('./courses');
const timetables = require('./timetables');
const memos = require('./memos');
const sequelize = require('sequelize');
const router = Router();

router.use('/courses', courses)
router.use('/timetable', timetables)
router.use('/memos', memos)

/* GET home page. */
router.get('/', async function(req, res, next) {
    let courses = await models.Courses.findAll()
    let tables = await models.Timetables.findAll()
    let memos = await models.Memos.findAll()
    let array = []
    let my_timetable = new Array();
    my_timetable.mon = []
    my_timetable.tue = []
    my_timetable.wed = []
    my_timetable.thu = []
    my_timetable.fri = []
    
    if(tables){
      try{
        tables.forEach(function(t){
          array.push(t.dataValues)
        })
        array.forEach(function(a){
          a.memo = []
          memos.forEach(function(m){
            if(m.dataValues.tableId == a.id){
              a.memo.push(m.dataValues)
            }
          })
        })

      for( let i=0; i < array.length; i++){
          
          if(array[i].id < 10) array[i].id = '0'+array[i].id
          if(array[i].course_end - array[i].course_start == 2){
            arrry[i].hr = 2
          }
          console.log(array[i])
          if(array[i].course_day.indexOf('월')!==-1){
            my_timetable.mon.push(array[i])
          }
          if(array[i].course_day.indexOf('화')!==-1){
            my_timetable.tue.push(array[i])
          }
          if(array[i].course_day.indexOf('수')!==-1){
            my_timetable.web.push(array[i])
          }
          if(array[i].course_day.indexOf('목')!==-1){
            my_timetable.thu.push(array[i])
          }
          if(array[i].course_day.indexOf('금')!=-1){
            my_timetable.fri.push(array[i])
          }
      }
  
    res.render('index', {
      title: 'programmers 과제 테스트 템플릿 - Node.js', 
      courses: courses,
      timetables: my_timetable
    })
  }catch(err){
    console.log(err);
  }
}

else{
    res.render('index', 
      {  
        title: 'programmers 과제 테스트 템플릿 - Node.js', 
        courses: courses,
    });
  }
})

module.exports = router;
