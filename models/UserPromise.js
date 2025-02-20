const mongoose = require('mongoose');

const UserPromiseSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

console.log('UserPromise model loaded');
module.exports = mongoose.model('UserPromise', UserPromiseSchema);