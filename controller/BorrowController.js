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

// Pengembalian buku oleh user
exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const userId = req.user.id; // dari middleware protect

    const borrow = await Borrow.findOne({ _id: borrowId, user: userId });
    if (!borrow) {
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }

    if (borrow.status === 'dikembalikan') {
      return res.status(400).json({ message: 'Buku sudah dikembalikan' });
    }

    // Update borrow
    borrow.status = 'dikembalikan';
    borrow.return_at = new Date();
    await borrow.save();

    // Tambah stok buku
    await Book.findByIdAndUpdate(borrow.book, { $inc: { stock: 1 } });

    res.json({ message: 'Buku berhasil dikembalikan!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengembalikan buku' });
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