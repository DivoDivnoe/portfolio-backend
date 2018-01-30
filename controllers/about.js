const http = require('request');

const apiOptions = {
  server: 'http://92.53.105.12:80'
};

module.exports.getAboutPage = (req, res, next) => {
  const pathAPI = '/api/skills';
  const requestOptions = {
    url: apiOptions.server + pathAPI,
    method: 'GET'
  };
  const sendObj = {
    title: 'About Me'
  };
  http(requestOptions, (error, response, body) => {
    res.render('pages/about', Object.assign(sendObj, JSON.parse(body)));
  });
};
