const mongoose = require('mongoose');
const fs = require('fs');
var formidable = require('formidable');
const path = require('path');

const uploadWork = (req, res, success) => {
  let form = new formidable.IncomingForm();
  let upload = 'build/upload';
  let fileName = null;

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = upload;

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.status(400).json({
        msg: 'Не удалось загрузить картинку'
      });
    }

    fileName = path.join(upload, files.image.name);

    fs.rename(files.image.path, fileName, function (err) {
      if (err) {
        fs.unlink(fileName);
        fs.rename(files.image.path, fileName);
      } else {
        const dir = fileName.substr(fileName.indexOf('\\'));
        success(fields, dir);
      }
    });
  });
};

module.exports.getWorks = (req, res) => {
  const Work = mongoose.model('work');

  Work.find().then(items => {
    res.status(200).json({
      works: items
    });
  });
};

module.exports.createWork = (req, res) => {
  const Model = mongoose.model('work');

  uploadWork(req, res, function (fields, image) {
    const item = new Model({
      title: fields.name,
      skills: fields.tehnologies,
      link: fields.link,
      img: image
    });

    item
      .save()
      .then(item =>
        res.status(200).json({
          msg: 'Запись успешно добавлена'
        })
      )
      .catch(error => {
        res.status(400).json({
          msg: 'Запись не сохранилась в БД ' + error
        });
      });
  });
};