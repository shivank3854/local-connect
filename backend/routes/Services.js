const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const { authMiddleware, businessOnly } = require('../middleware/auth')

// CREATE a service (business only)
router.post('/', authMiddleware, businessOnly, async (req, res) => {
  try {
    const service = new Service({
      business: req.user.businessId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image || ''
    })
    const savedService = await service.save()
    res.json(savedService)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET all services (public - customers browse)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('business', 'businessName city address')
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET services by category
router.get('/category/:category', async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category }).populate('business', 'businessName city address')
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('business', 'businessName city address phone')
    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET services created by logged-in business
router.get('/my/services', authMiddleware, businessOnly, async (req, res) => {
  try {
    const services = await Service.find({ business: req.user.businessId })
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// UPDATE a service (business only, own service)
router.put('/:id', authMiddleware, businessOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }
    if (service.business.toString() !== req.user.businessId) {
      return res.status(403).json({ message: "You can only edit your own services" })
    }
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE a service (business only, own service)
router.delete('/:id', authMiddleware, businessOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }
    if (service.business.toString() !== req.user.businessId) {
      return res.status(403).json({ message: "You can only delete your own services" })
    }
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: "Service deleted successfully!" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router