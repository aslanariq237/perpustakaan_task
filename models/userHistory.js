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
});

module.exports = mongoose.model('menu', userHistorySchema);