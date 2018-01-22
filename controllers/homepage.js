module.exports.getIndex = (req, res, next) => {
  res.render('pages/index', {title: 'Сайт-портфолио'});
};