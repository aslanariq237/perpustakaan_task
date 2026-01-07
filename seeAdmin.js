// seedAdmin.js (versi diperbaiki)

const mongoose = require('mongoose');
const User = require('./models/User'); // sesuaikan path

const mongoURI = 'mongodb+srv://admin:gsWafKZ7etfJVeyj@librarycluster.caumvvi.mongodb.net/libraryDB?retryWrites=true&w=majority'; // ganti dengan nama DB kamu

const adminData = {
  username: 'admin',
  password: 'admin123',   // ganti dengan password yang aman
  role: 'admin'
};

async function seedAdmin() {
  try {
    // KONEKSI YANG BENAR UNTUK MONGOOSE 6+
    await mongoose.connect(mongoURI);
    console.log('Terhubung ke MongoDB');

    // Cek apakah admin sudah ada
    const existingAdmin = await User.findOne({ username: adminData.username });
    if (existingAdmin) {
      console.log(`User "${adminData.username}" sudah ada. Tidak membuat duplikat.`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Buat user admin
    const adminUser = new User(adminData);
    await adminUser.save();

    console.log('Berhasil membuat user admin:');
    console.log({
      username: adminUser.username,
      role: adminUser.role,
      createdAt: adminUser.createdAt
    });

    // Tutup koneksi
    await mongoose.connection.close();
    console.log('Koneksi MongoDB ditutup.');
    process.exit(0);

  } catch (error) {
    console.error('Error saat seeding admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();