
import {  useState } from 'react'
import './App.css'
import { Session } from './modules/Session'

import socket from './socket'

//  reconhecer os user conectado
import { Username } from './components/InputUsername'

import { Home } from './pages/Home'


function App() {

  const [state, setState] = useState(false)

  const [messagesRecieved, setMessagesReceived] = useState([])


  const [username, setUsernameMaster] = useState()
  const [onlines, setOnlines] = useState('null')


  return (

    <Session className="App" socket={socket} setState={setState} setMessagesReceived={setMessagesReceived} setOnlines={setOnlines} >

      {
        state.username ?
          <Home socket={socket} messagesRecieved={messagesRecieved} setMessagesReceived={setMessagesReceived} username={username} onlines={onlines} />
            :
          <Username socket={socket} setUsernameMaster={setUsernameMaster} />

      }




    </Session>

  )
}

export default App
