var express = require('express');
var router = express.Router();
const ctrlHome = require('../controllers/homepage');
const ctrlAuth = require('../controllers/auth');
const ctrlWorks = require('../controllers/works');
const ctrlBlog = require('../controllers/blog');
const ctrlAbout = require('../controllers/about');

/* GET home page. */
router.get('/', ctrlHome.getIndex);
router.get('/auth', ctrlAuth.getAuthPage);
router.get('/works', ctrlWorks.getWorksPage);
router.get('/blog', ctrlBlog.getBlogPage);
router.get('/about', ctrlAbout.getAboutPage);

module.exports = router;
