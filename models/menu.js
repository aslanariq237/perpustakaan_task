const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl : String,
});

module.exports = mongoose.model('Menu', menuSchema);