// routes/frontend.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Halaman utama

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/auth', 'login.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/auth', 'register.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/user/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user', 'dashboard.html'));
});

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin', 'admin.html'));
});

router.get('/admin/add-book', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin', 'add-book.html'));
});


module.exports = router;