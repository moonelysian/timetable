const { Router } = require('express');
const models = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op;
//const memo = require('./memo');

const router = Router();

//router.use('/memo', memo)

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Courses.findAll()
  .then((courses) => { 
    res.render('index', 
    { 
      title: 'programmers 과제 테스트 템플릿 - Node.js', 
      courses: courses
    }); 
});
});

module.exports = router;
