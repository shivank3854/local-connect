const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'business'
  }
}, { timestamps: true })

module.exports = mongoose.model('Business', businessSchema)