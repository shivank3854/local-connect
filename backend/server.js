require('dotenv').config()
const connectedUsers = {}
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const connectDB = require('./config/db')

const customerAuthRouter = require('./routes/customerAuth')
const businessAuthRouter = require('./routes/businessAuth')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})
app.set('io', io)
app.set('connectedUsers', connectedUsers)
const servicesRouter = require('./routes/services')
const bookingsRouter = require('./routes/bookings')
const reviewsRouter = require('./routes/reviews')
app.use('/reviews', reviewsRouter)


app.use(cors())
app.use(express.json())

app.use('/auth/customer', customerAuthRouter)
app.use('/auth/business', businessAuthRouter)
app.use('/services', servicesRouter)
app.use('/bookings', bookingsRouter)



app.get('/', (req, res) => {
  res.send("Local Connect API is running!")
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  // user registers their socket with their ID
  socket.on('register', (userId) => {
    connectedUsers[userId] = socket.id
    console.log('Registered user:', userId, socket.id)
  })

  socket.on('disconnect', () => {
    // remove user from connectedUsers when they disconnect
    Object.keys(connectedUsers).forEach(userId => {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId]
      }
    })
    console.log('User disconnected:', socket.id)
  })
})


connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  })
})