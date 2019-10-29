const { Router } = require('express');
const models = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op;

const router = Router();

router.get('/:code', function(req, res, next) {
    const code = req.params.code;
    models.Courses.findOne( {where: {code: code}} )
    .then( course => {
        res.send( { course: course } );
    });
});

router.get('/search/:search', function(req, res, next){
    let search = req.params.search;
    models.Courses.findAll({
        where:{
            [Op.or]:[
                {
                    code: {
                        [Op.like]: "%" + search + "%"
                    }
                },
                {
                    lecture: {
                        [Op.like]: "%" + search + "%"
                    }
                },
                {
                    professor: {
                        [Op.like]: "%" + search + "%"
                    }
                },
            ]
        }
    })
    .then((search)=>{
        res.render('index',{
            courses: search
        })
    })
})
  
  module.exports = router;