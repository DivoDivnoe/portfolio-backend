const nodemailer = require('nodemailer');
const config = require('../config/config.json');

module.exports.getWorksPage = (req, res, next) => {
  res.render('pages/works', {
    title: 'Мои работы',
    msg: req.query.msg
  });
};

module.exports.sendEmail = (req, res) => {
  console.log('test');
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
    if (error) {
      return res.redirect('/works?msg=Произошла ошибка при отправке письма');
    }

    return res.redirect('/works?msg=Письмо успешно отправлено');
  });
};
