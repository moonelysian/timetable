const { Router } = require('express');
const TableController = require('../controllers/TableController');

const router = Router();

router.post('', TableController.createTable);
router.delete('/:course_code', TableController.deleteTable);

module.exports = router;