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

  socket.on('addUser', userObj => {
    const foundUser = users.find( user => user.email === userObj.email )
    if(!foundUser){
      users.push(userObj)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
    console.log(users)
    const index = users.findIndex( userObj => userObj.socketId === socket.id )
    users = [...users.slice(0, index), ...users.slice(index + 1)]
    console.log(users)
  })
})

server.listen( port, () => console.log(`listening on port ${port}`))
