const { Router } = require('express');
const models = require('../models');         
const courses = require('./courses');
const timetables = require('./timetables');
//const memo = require('./memo');

const router = Router();
router.use('/courses', courses)
router.use('/timetable', timetables)
//router.use('/memo', memo)

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Courses.findAll()
  .then(courses => {
    res.render('index', 
    { 
      title: 'programmers 과제 테스트 템플릿 - Node.js', 
      courses: courses
    }); 
  });
  // models.Timetable.findAll()
  // .then(time)
});

module.exports = router;
