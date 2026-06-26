const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied! No token provided." })
  }

  try {
    const token = authHeader.split(' ')[1]
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).json({ message: "Invalid token!" })
  }
}

// extra middleware to restrict routes to only business owners
const businessOnly = (req, res, next) => {
  if (req.user.role !== 'business') {
    return res.status(403).json({ message: "Access denied! Business accounts only." })
  }
  next()
}

// extra middleware to restrict routes to only customers
const customerOnly = (req, res, next) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ message: "Access denied! Customer accounts only." })
  }
  next()
}

module.exports = { authMiddleware, businessOnly, customerOnly }