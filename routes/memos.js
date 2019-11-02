const {Router} = require('express');
const MemoController = require('../controllers/MemoController');

const router = Router();

router.get('table/:tableId', MemoController.getMemo);
router.post('', MemoController.createMemo);
router.delete('/:memoId', MemoController.deleteMemo)

module.exports = router;