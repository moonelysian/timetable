const {Router} = require('express');
const MemoController = require('../controllers/MemoController');

const router = Router();

router.get('', MemoController.getMemo);

module.exports = router;