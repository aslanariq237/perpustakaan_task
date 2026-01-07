const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data buku" });
  }
};

exports.getPopularBooks = async (req, res) => {
  try {
    const popular = await Book.aggregate([
      { $sort: { borrowCount: -1 } },
      { $group: { _id: "$category", books: { $push: "$$ROOT" } } },
      { $project: { books: { $slice: ["$books", 5] } } },
    ]);
    res.json(popular);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterBook = async (req, res) => {
  try {
    const { category, author } = req.query;
    let filter = {};
    if (category) filter.category = new RegExp(category, "i");
    if (author) filter.author = new RegExp(author, "i");
    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, category, imageUrl, stock } = req.body;

    if (!title || !author || !category) {
      return res
        .status(400)
        .json({ message: "Judul, penulis, dan kategori wajib diisi" });
    }

    const newBook = new Book({
      title,
      author,
      category,
      imageUrl: imageUrl || undefined,
      stock: stock || 1,
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Buku berhasil ditambahkan!", book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan buku" });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const bookId = req.params.id;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({ message: "Stok tidak valid" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { stock },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res
      .status(200)
      .json({ message: "Stok berhasil diperbarui!", book: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal update stok" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.findByIdAndDelete(bookId);
    if (!deleted) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }
    res.status(200).json({ message: "Buku berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus buku" });
  }
};
