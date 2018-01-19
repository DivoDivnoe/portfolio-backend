module.exports.getBlogPage = (req, res, next) => {
  res.render('pages/blog', {title: 'Express'});
};