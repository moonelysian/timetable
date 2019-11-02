const { Router } = require('express');
const models = require('../models');         
const courses = require('./courses');
const timetables = require('./timetables');
const memos = require('./memos');

const router = Router();
router.use('/courses', courses)
router.use('/timetable', timetables)
router.use('/memos', memos)

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Courses.findAll()
  .then(courses => {
    try{
      models.Timetables.findAll({
        include: {
          model: models.Memos
        },
        order: [['course_start']]
      })
      .then(timetable => {
        res.render('index', 
        { 
          title: 'programmers 과제 테스트 템플릿 - Node.js', 
          courses: courses,
          timetable: timetable
        }); 
      }) 
    } catch(err){
      console.log(err);
    }
  })
});

module.exports = router;
