import { useEffect, useState } from "react"
import { Mensage } from "../components/Mensage"

import { ChatInput} from "../components/ChatInput"


export const Home = ({ socket, messagesRecieved, setMessagesReceived, username, onlines}) => {



    const [mensage, setMensage] = useState('')



    const sendMensage = () => {
        setMensage('')
        setMessagesReceived(prevOld => [...prevOld, {
            socketId: socket.id,
            username,
            msg: mensage
        }])
        socket.emit('send-mensage', {
            mensage: mensage,
            username
        })
    }

    useEffect(() => {


        socket.on('login-user', data => {
            console.log(data)
        })



        return () => socket.off('login-user')

    }, [socket, onlines])




    return (
        <main id="container">
            <span>Onlines: <strong>{onlines}</strong></span>


            <Mensage socket={socket} messagesRecieved={messagesRecieved}  />
            <div id='chat'>
                <ChatInput setMensage={setMensage} sendMensage={sendMensage} mensage={mensage} />
                <button onClick={() => sendMensage()}>ENVIAR</button>
            </div>

        </main>
    )
}