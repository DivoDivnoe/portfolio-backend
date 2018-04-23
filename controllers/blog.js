const http = require('request');

const apiOptions = {
  server: 'https://stark-meadow-92314.herokuapp.com'
};

const getDateTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month < 9 ? '0' + (month + 1) : month + 1}-${day}`;
};

module.exports.getBlogPage = (req, res, next) => {
  const pathAPI = '/api/blog';
  const requestOptions = {
    url: apiOptions.server + pathAPI,
    method: 'GET'
  };
  const sendObj = {
    title: 'My Blog'
  };
  http(requestOptions, (error, response, body) => {
    console.log(error);
    //console.log(body);
    body = JSON.parse(body);

    body.articles.forEach(article => {
      const date = new Date(article.date);

      article.datetime = getDateTime(date);
      article.date = date.toLocaleDateString('ru', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    });

    res.render('pages/blog', Object.assign(sendObj, body));
  });
};
