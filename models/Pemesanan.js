const mongoose = require('mongoose');

const userHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
      },
    name: String,
    price: Number,
    imageUrl : String,
});

module.exports = mongoose.model('menu', userHistorySchema);