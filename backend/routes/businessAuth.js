const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Business = require('../models/Business')

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const existingBusiness = await Business.findOne({ email: req.body.email })
    if (existingBusiness) {
      return res.status(400).json({ message: "Email already registered!" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const business = new Business({
      ownerName: req.body.ownerName,
      businessName: req.body.businessName,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone || '',
      address: req.body.address || '',
      city: req.body.city || ''
    })

    const savedBusiness = await business.save()
    res.json({ message: "Registration successful!", businessId: savedBusiness._id })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const business = await Business.findOne({ email: req.body.email })
    if (!business) {
      return res.status(400).json({ message: "Email not found!" })
    }

    const validPassword = await bcrypt.compare(req.body.password, business.password)
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password!" })
    }

    const token = jwt.sign(
      { businessId: business._id, businessName: business.businessName, role: 'business' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ message: "Login successful!", token, businessName: business.businessName, role: 'business' })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router