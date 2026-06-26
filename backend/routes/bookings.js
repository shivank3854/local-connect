const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Service = require('../models/Service')
const { authMiddleware, businessOnly, customerOnly } = require('../middleware/auth')

// CREATE booking (customer only)
router.post('/', authMiddleware, customerOnly, async (req, res) => {
  try {
    const { serviceId, bookingDate } = req.body

    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    const booking = new Booking({
      customer: req.user.userId,
      business: service.business,
      service: service._id,
      bookingDate: bookingDate,
      totalPrice: service.price
    })

    const savedBooking = await booking.save()
    res.json(savedBooking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET bookings for logged-in customer
router.get('/my/customer', authMiddleware, customerOnly, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.userId })
      .populate('service', 'title price category')
      .populate('business', 'businessName phone city')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET bookings for logged-in business
router.get('/my/business', authMiddleware, businessOnly, async (req, res) => {
  try {
    const bookings = await Booking.find({ business: req.user.businessId })
      .populate('service', 'title price category')
      .populate('customer', 'name phone email')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// UPDATE booking status (business only - they confirm/progress/complete)
router.put('/:id/status', authMiddleware, businessOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    if (booking.business.toString() !== req.user.businessId) {
      return res.status(403).json({ message: "You can only update your own bookings" })
    }

    booking.status = req.body.status
    await booking.save()
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CANCEL booking (customer only - their own booking)
router.put('/:id/cancel', authMiddleware, customerOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    if (booking.customer.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You can only cancel your own bookings" })
    }

    booking.status = 'Cancelled'
    await booking.save()
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router