const mongoose = require('mongoose');
const skills = require('../models/skills.json');

module.exports.getSkills = (req, res) => {
  const Model = mongoose.model('skill');

  Model.find()
    .then(items => {
      res.status(200).json({
        skills: items
      });
    })
    .catch(error => res.status(400));
};

module.exports.editSkills = (req, res) => {
  const promises = req.body.map(it => {
    const Model = mongoose.model('skill');
    const item = new Model({
      name: it.name,
      perc: it.perc
    });

    return Model.findOneAndUpdate({
      name: item.name
    }, {
      $set: {
        perc: item.perc
      }
    });
  });

  Promise.all(promises)
    .then(items => {
      if (!!items) {
        res.status(200).json({
          msg: 'Запись успешно обновлены'
        });
      } else {
        res.status(404).json({
          msg: 'Ошибка! Записи на найдены'
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: 'Ошибка при обновлении записей: ' + error
      });
    });
};