// routes/admin.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAllBooks,
  addBook,
  updateStock,
  deleteBook
} = require('../controller/BookController');

router.get('/books', protect, adminOnly, getAllBooks);

router.post('/add-book', protect, adminOnly, addBook);

router.put('/update-stock/:id', protect, adminOnly, updateStock);

router.delete('/delete/:id', protect, adminOnly, deleteBook);

module.exports = router;