// routes/api.js
const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');
const borrowController = require('../controller/BorrowController');
const { protect } = require('../middleware/auth');


router.get('/books', bookController.getAllBooks);
router.get('/books/fiter', bookController.filterBook);

router.post('/books/borrow', protect, borrowController.borrowBook);

router.get('/borrows/my-history', protect, borrowController.getMyHistory);

router.get('/popular-books', bookController.getPopularBooks);

module.exports = router;