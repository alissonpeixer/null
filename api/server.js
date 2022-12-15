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

let userId = 1

const mensage = []

const rooms = []


io.of("/").adapter.on("create-room", (room) => {
    rooms.push(room)
    console.log(`room ${room} was created`);
});

io.on('connection', async (socket) => {

    console.log(`+ ${socket.id} connected in server`)

    socket.on('join-user', async username => {


        let valid = true
        const id = ++userId



        mensage.push({
            username,
            id: id,
            socketId: socket.id,
            msg: 'Acbou de entrar no chat!'
        })




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


        socket.emit('login-user', {
            username,
            userId: id,
            socketId: socket.id,
            msg: `Bem vindo ao chat! Online agora ${userId} Users!`
        })

        socket.broadcast.emit('join-user', {
            username,
            id: id,
            socketId: socket.id,
            msg: 'Acbou de entrar no chat!'
        })







        socket.emit('acount-users', userId);

        socket.broadcast.emit('acount-users', userId);


        socket.emit('states', mensage)

    })


    socket.on('disconnect', data => {
        console.log(`- Disconnecting ${socket.id}`)



        --userId
        db.map(data => {

            if (data.socketId === socket.id) {
                db.splice(data)
                socket.broadcast.emit('disconnect-user', {
                    username: data.username,
                    socketId: data.socketId,
                    msg: 'Acabou de sair do chat'
                })

                console.log(db)

                return
            }

            console.log(db)
        })



        socket.broadcast.emit('acount-users', userId);




    })


    socket.on('send-mensage', data => {

        mensage.push(data)

        socket.broadcast.emit('reveb mensage', {
            msg: data.mensage,
            username: data.username
        })
    })

    socket.on('reconnect', data => {
        console.log(`+ Reconnect ${socket.id}`)

    })


})






server.listen(process.env.SERVER_PORT, () =>
    console.log(`Server running in ${process.env.SERVER_IP}:${process.env.SERVER_PORT}`)
)