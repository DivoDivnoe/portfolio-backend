const mongoose = require('mongoose');

module.exports.getArticles = (req, res) => {
  const blog = mongoose.model('blog');

  blog.find().then(items => {
    res.status(200).json({
      articles: items
    });
  });
};

module.exports.createArticle = (req, res) => {
  const Model = mongoose.model('blog');

  const item = new Model({
    title: req.body.title,
    date: new Date(req.body.date),
    text: req.body.text
  });

  item
    .save()
    .then(item => res.status(200).json({msg: 'Запись успешно добавлена'}))
    .catch(error => {
      res.status(400).json({msg: 'Запись не сохранилась в БД ' + error});
    });
};

module.exports.editArticle = (req, res) => {
  const id = req.params.id;
  const item = new Model({
    title: req.body.title,
    date: new Date(req.body.date),
    message: req.body.message
  });

  const Model = mongoose.model('blog');

  Model.findByIdAndUpdate(id, {
    $set: {
      item
    }
  })
    .then(item => {
      if (!!item) {
        res.status(200).json({
          message: 'Запись успешно обновлена'
        });
      } else {
        res.status(404).json({
          message: 'Ошибка! Запись на найдена'
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: 'Ошибка при обновлении записи: ' + error
      });
    });
};

module.exports.deleteArticle = (req, res) => {
  const id = req.params.id;

  const Model = mongoose.model('blog');

  Model.findByIdAndRemove(id)
    .then(item => {
      if (!!item) {
        res.status(200).json({
          message: 'Запись успешно удалена'
        });
      } else {
        res.status(404).json({
          message: 'Ошибка! Запись на найдена'
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: 'Ошибка при удалении записи: ' + error
      });
    });
};
