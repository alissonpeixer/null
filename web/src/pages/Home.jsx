import { useState } from "react"
import { Mensage } from "../components/Mensage"

export const Home = ({ socket, userDataSocket, onlines }) => {



    return (
        <main id="container">
            <span>Online agora: {onlines}</span>


            <Mensage socket={socket} userDataSocket={userDataSocket}  />


        </main>
    )
}