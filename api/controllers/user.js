const mongoose = require('mongoose');

module.exports.isAuth = (req, res) => {
  const Model = mongoose.model('user');

  Model.findOne({login: req.body.login})
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({status: 'err', message: 'Пользователь не существует'});
      }
      if (!user.validPassword(req.body.password)) {
        return res
          .status(400)
          .json({status: 'err', message: 'Пароль введен неверно!'});
      } else {
        res.status(200).json({status: 'ok', message: 'Авторизация успешна'});
      }
    })
    .catch(err =>
      res.status(400).json({
        status: 'err',
        message: 'Произошла ошибка: ' + err.message
      })
    );
};
