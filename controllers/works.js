const nodemailer = require('nodemailer');
const http = require('request');
const config = require('../config/config.json');

const apiOptions = {
  server: 'http://92.53.105.12'
};

module.exports.getWorksPage = (req, res, next) => {
  const pathAPI = '/api/works';
  const requestOptions = {
    url: apiOptions.server + pathAPI,
    method: 'GET'
  };
  const sendObj = {
    title: 'My Works'
  };
  http(requestOptions, (error, response, body) => {
    res.render('pages/works', Object.assign(sendObj, JSON.parse(body)));
  });
};

module.exports.sendEmail = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.redirect('/works?msg=Все поля нужно заполнить!');
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: ${req.body.email}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('OK');
    if (error) {
      return res.redirect('/works?msg=Произошла ошибка при отправке письма');
    }

    return res.redirect('/works?msg=Письмо успешно отправлено');
  });
};
