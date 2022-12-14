import express from "express";
import http from 'http'
import { Server } from "socket.io";

import * as dotenv from "dotenv";

dotenv.config()

const app = express()
const server = http.createServer(app)

const socket = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})


socket.on('connection', (socket) => {

    console.log(`+ ${socket.id} connected in server`)

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('receber', msg)
    })


})



server.listen(process.env.SERVER_PORT, () =>
    console.log(`Server running in ${process.env.SERVER_IP}:${process.env.SERVER_PORT}`)
)