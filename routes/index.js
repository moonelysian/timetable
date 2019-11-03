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
router.get('/', function(req, res, next) {
  try{
    models.Courses.findAll()
    .then(courses => {
      models.sequelize.query(`
          SELECT 
          Timetables.*,
          Memos.id as memo_id,
          Memos.title as memo_title,
          Memos.content as memo_content
          FROM
            Timetables
              LEFT JOIN Memos ON 
          Timetables.id = Memos.tableId`)
      .then(result => {
        let test = new Array();
        test.mon = []
        test.tue = []
        test.wed = []
        test.thu = []
        test.fri = []
        result[0].forEach(function(e){
          if(e.id <10){
            e.id = '0'+e.id
          }
          
          e.hr = (e.course_end - e.course_start)

          if(e.course_day.indexOf('월')!=-1){
            test.mon.push(e)
          }
          if(e.course_day.indexOf('화')!=-1){
            test.tue.push(e)
          }
          if(e.course_day.indexOf('수')!=-1){
            test.wed.push(e)
          }
          if(e.course_day.indexOf('목')!=-1){
            test.thu.push(e)
          }
          if(e.course_day.indexOf('금')!=-1){
            test.fri.push(e) 
          }
        })
        console.log(test);
        res.render('index', 
        { 
          title: 'programmers 과제 테스트 템플릿 - Node.js', 
          courses: courses,
          timetable: test
        });
      });
  });
  }
  catch(err){console.log(err)} 
  
});
module.exports = router;
