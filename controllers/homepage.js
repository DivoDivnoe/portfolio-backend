const http = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

module.exports.getIndex = (req, res, next) => {
  res.render('pages/index', {
    title: 'Сайт-портфолио',
    msg: req.query.msg
  });
};

module.exports.auth = (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(400).json({
      msg: 'Все поля обязательны к заполнению'
    });
  }

  const pathApi = '/api/user';
  const requestOptions = {
    url: apiOptions.server + pathApi,
    method: 'POST',
    json: {
      login: req.body.login,
      password: req.body.password
    }
  };
  http(requestOptions, function(error, response, body) {
    if (body.status === 'err') {
      return res.status(400).json({
        msg: body.message
      });
    }
    req.session.isAdmin = true;
    res.redirect('/admin');
  });
};
