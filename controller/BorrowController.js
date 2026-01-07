// controllers/borrowController.js
const Book = require('../models/book');
const Borrow = require('../models/borrow');

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, follow_instruct } = req.body;
    const userId = req.user.id;

    if (!bookId || follow_instruct !== true) {
      return res.status(400).json({ message: 'Harap setujui peraturan perpustakaan' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    if (book.stock <= 0) {
      return res.status(400).json({ message: 'Maaf, stok buku habis' });
    }

    // Kurangi stok
    book.stock -= 1;
    book.borrowCount = (book.borrowCount || 0) + 1;
    await book.save();

    // Simpan riwayat peminjaman
    const borrow = new Borrow({
      user: userId,
      book: bookId,
      bookSnapshot: {
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl
      },
      follow_instruct: true
    });
    await borrow.save();

    res.json({ message: 'Buku berhasil dipinjam! Terima kasih.' });
  } catch (err) {
    console.error('Borrow error:', err);
    res.status(500).json({ message: 'Gagal meminjam buku' });
  }
};

exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await Borrow.find({ user: userId })
      .populate('book', 'title author imageUrl stock')
      .sort({ issue_at: -1 });

    res.json(history);
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ message: 'Gagal mengambil riwayat' });
  }
};