const {Router} = require('express');
const {createChapter, getChapters, getChapter, deleteChapter, searchChapters} = require('../controllers/chapter_controller');

const router = Router();

router.post('/chapter', createChapter);
router.get('/chapters',getChapters);
router.get('/chapter/:id', getChapter);
router.delete('/chapter/:id', deleteChapter);
router.get('/chapters/search', searchChapters)

module.exports = router;