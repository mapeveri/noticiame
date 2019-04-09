const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: { type: String, required: true }
});

const Notice = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  created: { type: Date, required: true },
  origin: { type: String, required: true },
  url: { type: String, required: true },
  categories: [CategoriesSchema],
});

module.exports = mongoose.model('Notice', Notice);
