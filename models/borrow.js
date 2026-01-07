const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  bookSnapshot: {
    title: String,
    author: String,
    imageUrl: String
  },
  issue_at: {
    type: Date,
    default: Date.now
  },
  return_at: {
    type: Date,
    default: null
  },
  follow_instruct: {
    type: Boolean,
    required: true,
    default: false
  },
  status: {
    type: String,
    enum: ['dipinjam', 'dikembalikan'],
    default: 'dipinjam'
  }
});

borrowSchema.index({ user: 1, issue_at: -1 });

module.exports = mongoose.model('Borrow', borrowSchema);