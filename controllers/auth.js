module.exports.getAuthPage = (req, res, next) => {
  res.render('pages/auth', {title: 'Express'});
};