// routes/api.js
const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');
const borrowController = require('../controller/BorrowController');
const { protect } = require('../middleware/auth');


// books
router.get('/books', bookController.getAllBooks);
router.get('/books/filter', bookController.filterBook);
router.get('/popular-books', bookController.getPopularBooks);

router.post('/books/borrow', protect, borrowController.borrowBook);

// borrow
router.get('/borrows/my-history', protect, borrowController.getMyHistory);

router.put('/borrows/return/:id', protect, borrowController.returnBook);

module.exports = router;