import express from "express";
import http from 'http'
import { Server } from "socket.io";

import * as dotenv from "dotenv";

dotenv.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const db = []

let userId = 0

const mensage = []


io.on('connection', async (socket) => {

    console.log(`+ ${socket.id} connected in server`)


    socket.on('join-user', username => {

        let valid = true
        const id = ++userId


        db.map(data => {

            if (data.socketId === socket.id) {
                valid = false
            }
        })


        if (!valid) {
            console.log('! erro')
            return
        }





        db.push(
            {
                socketId: socket.id,
                username: username,
                id: id
            }
        )






        socket.broadcast.emit('join-user', {
            username,
            id: id,
            socketId: socket.id
        })



        socket.emit('login-user', {
            username,
            id: id,
            socketId: socket.id
        })





        console.log(db)
    })


    socket.on('disconnect', data => {
        console.log(`- Disconnecting ${socket.id}`)

        db.map(data => {

            if (data.socketId === socket.id) {
                db.splice(data)
                --userId
            }

        })

        console.log(db)
    })


    socket.on('reconnect', data => {
        console.log(`+ Reconnect ${socket.id}`)
    })

})






server.listen(process.env.SERVER_PORT, () =>
    console.log(`Server running in ${process.env.SERVER_IP}:${process.env.SERVER_PORT}`)
)