import { useEffect, useState } from "react"



export const Mensage = ({ socket, userDataSocket }) => {

    const [messagesRecieved, setMessagesReceived] = useState([])

    useEffect(() => {
        socket.on('join-user', (data) => {
        setMessagesReceived((state) => [
            ...state,
            data
        ])
        });


        return () => socket.off('join-user');
    }, [socket]);







    return (
        <ul className="chat-area">

            {userDataSocket.username &&
                <li className="mensage-li">
                        <span>
                            <strong>{userDataSocket.username} {`>`}</strong>
                        </span>
                        <p>Acabou de entrar no chat!</p>
                   </li>}

            {

                messagesRecieved.map((data, id) => (
                    <li key={id} className="mensage-li">
                        <span>
                            <strong>{data.username} {`>`}</strong>
                        </span>
                        <p>Acabou de entrar no chat!</p>
                    </li>
                ))


            }



        </ul>
    )
}