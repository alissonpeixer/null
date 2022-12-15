import { useState } from "react"
import axios from 'axios';
import { useLocalStorage } from "react-use";


export const Signup = ({setState,setAuth}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')



    const sendData = async () => {

        setState((prevState) => ({ ...prevState, loading: true }))

        await axios({
            method: 'post',
            url: 'http://localhost:9901/signup',
            data: {
                name,
                username
            }
        }).then(res => {
            console.log(res)
            setState((preState) => ({ ...preState, loading: false, data: res.data }))
            setAuth(res.data)
        })



    }


    return (
        <main className="form">
            <input
                type="text"
                placeholder="Nome"
                onChange={(ev) => setName(ev.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                onChange={(ev) => setUsername(ev.target.value)}
            />

            <button
                type="button"
                onClick={() => sendData()}

            >Registra-se</button>
        </main>
    )
}