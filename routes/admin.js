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

// GET semua buku (admin only)
router.get('/books', protect, adminOnly, getAllBooks);

// POST tambah buku
router.post('/add-book', protect, adminOnly, addBook);

// PUT update stok
router.put('/update-stock/:id', protect, adminOnly, updateStock);

// DELETE buku
router.delete('/delete/:id', protect, adminOnly, deleteBook);

module.exports = router;