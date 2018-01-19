module.exports.getAboutPage = (req, res, next) => {
  res.render('pages/about', {title: 'Express'});
};