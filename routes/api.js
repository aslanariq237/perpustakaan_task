// routes/api.js
const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');
const borrowController = require('../controller/BorrowController');
const { protect, adminOnly } = require('../middleware/auth');


router.get('/books', bookController.getAllBooks);
router.get('/books/fiter', bookController.filterBook);

// // GET filter buku
// router.get('/books/filter', async (req, res) => {
//   try {
//     const { category, author } = req.query;
//     let filter = {};
//     if (category) filter.category = new RegExp(category, 'i'); // case insensitive
//     if (author) filter.author = new RegExp(author, 'i');
//     const books = await Book.find(filter);
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post('/books/borrow', protect, borrowController.borrowBook);

// GET riwayat user (harus login)
router.get('/borrows/my-history', protect, borrowController.getMyHistory);

// GET popular books per category
router.get('/popular-books', bookController.getPopularBooks);

// === ADMIN ROUTES ===

// GET semua buku untuk admin
// router.get('/admin/books', protect, adminOnly, async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST tambah buku baru
// router.post('/admin/add-book',protect, adminOnly, async (req, res) => {
//   try {
//     const { title, author, category, imageUrl, borrowCount = 0, stock = 10 } = req.body;
//     const newBook = new Book({ title, author, category, imageUrl, borrowCount, stock });
//     await newBook.save();
//     res.json({ message: 'Buku berhasil ditambahkan!', book: newBook });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // PUT update stok
// router.put('/admin/update-stock/:id', protect, adminOnly, async (req, res) => {
//   try {
//     const { stock } = req.body;
//     const book = await Book.findByIdAndUpdate(req.params.id, { stock }, { new: true });
//     if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
//     res.json({ message: 'Stok diperbarui!', book });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;