const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML, CSS, JS

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

const authRouter = require('./routes/auth');           // hanya router
const apiRouter = require('./routes/api');             // router buku, borrow, dll
const adminRoutes = require('./routes/admin');
const frontendRouter = require('./routes/frontend');   // serve HTML

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api', apiRouter);
app.use('/', frontendRouter);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}