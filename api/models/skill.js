'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  name: {
    type: String
  },
  perc: {
    type: Number,
    required: [true, 'Укажите проценты']
  },
  type: {
    type: String
  }
});

mongoose.model('skill', SkillSchema);
