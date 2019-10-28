const { Router } = require('express');
const { Course } = require('../models/courses')

const router = Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  Course.findAll()
  .then((courses) => { 
    res.render('index', 
    { 
      title: 'programmers 과제 테스트 템플릿 - Node.js', 
      courses: courses 
    }); 
});
});

module.exports = router;
