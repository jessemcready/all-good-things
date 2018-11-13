const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

let users = []

const port = process.env.PORT || 4001

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
  console.log('connected')

  socket.on('here', () => socket.emit('user connected', { message: 'Hello'}))

  socket.on('addUser', userObj => users.push(userObj))

  socket.on('disconnect', () => console.log('disconnected'))
})

console.log(io.clients)

server.listen( port, () => console.log(`listening on port ${port}`))
