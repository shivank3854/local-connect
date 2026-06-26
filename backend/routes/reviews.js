const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Booking = require('../models/Booking')
const { authMiddleware, customerOnly } = require('../middleware/auth')

// CREATE a review (customer only, booking must be Completed)
router.post('/', authMiddleware, customerOnly, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body

    // check booking exists and is completed
    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    if (booking.customer.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You can only review your own bookings" })
    }
    if (booking.status !== 'Completed') {
      return res.status(400).json({ message: "You can only review completed bookings" })
    }

    // check if already reviewed
    const existingReview = await Review.findOne({ booking: bookingId })
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this booking" })
    }

    const review = new Review({
      customer: req.user.userId,
      business: booking.business,
      booking: bookingId,
      rating,
      comment: comment || ''
    })

    await review.save()
    res.json({ message: "Review submitted!", review })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET reviews for a business
router.get('/business/:businessId', async (req, res) => {
  try {
    const reviews = await Review.find({ business: req.params.businessId })
      .populate('customer', 'name')
      .sort({ createdAt: -1 })

    // calculate average rating
    const average = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0

    res.json({ reviews, average, total: reviews.length })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router