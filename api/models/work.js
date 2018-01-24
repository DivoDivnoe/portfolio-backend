'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите, о чем работа']
  },
  skills: {
    type: String,
    required: [true, 'Укажите основные технологии']
  },
  link: {
    type: String,
    required: [true, 'Укажите ссылку на работу']
  },
  img: {
    type: String
  }
});

mongoose.model('work', WorkSchema);
