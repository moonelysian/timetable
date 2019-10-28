const {Router} = require('express');
const CourseController = require('../controllers/CourseController')

const router = Router();

router.get('', CourseController.getCources)

module.exports = router;