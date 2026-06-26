require('dotenv').config()
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
const servicesRouter = require('./routes/services')
const bookingsRouter = require('./routes/bookings')


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

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

connectDB().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  })
})