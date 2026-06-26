const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  senderRole: {
    type: String,
    enum: ['customer', 'business'],
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)