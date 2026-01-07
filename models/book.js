const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  imageUrl: String,
  borrowCount: Number,
  stock: { type: Number, default: 10 }
});

module.exports = mongoose.model('Book', bookSchema);