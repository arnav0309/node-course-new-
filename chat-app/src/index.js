const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = 3000
const publicDirectory = path.join(__dirname,'../public')

app.use(express.static(publicDirectory))

io.on('connection',()=>{
    console.log('New websocket connection')
})

server.listen(port,()=>{
    console.log('server is on port 3000')
})