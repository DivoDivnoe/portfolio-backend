var express = require('express');
var router = express.Router();

const ctrlBlog = require('../controllers/blog');
const ctrlSkills = require('../controllers/skills');
const ctrlWorks = require('../controllers/works');
const ctrlUser = require('../controllers/user');

router.get('/blog', ctrlBlog.getArticles);
router.post('/blog', ctrlBlog.createArticle);

router.get('/skills', ctrlSkills.getSkills);
router.put('/skills', ctrlSkills.editSkills);

router.get('/works', ctrlWorks.getWorks);
router.post('/works', ctrlWorks.createWork);

router.post('/user', ctrlUser.isAuth);

module.exports = router;
