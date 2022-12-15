import { useEffect, useState } from "react"

export const Username = ({socket, setUsernameMaster}) => {

    const [username, setUsername] = useState('')



    const onsubmit = () => {
        setUsernameMaster(username)
        socket.emit('join-user', username)
    }

    useEffect(() => {
        socket.on('user-exists', data => {
            console.log('+ Erro')
        })
    },[])


    return (

        <div id="username-area">


            <input
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={() => onsubmit()}>
                ENTRAR
            </button>

        </div>
    )
}