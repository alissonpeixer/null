
import { useState } from 'react'
import './App.css'
import { Session } from './modules/Session'

import socket from './socket'

//  reconhecer os user conectado
import { Username } from './components/InputUsername'

import { Home } from './pages/Home'


function App() {

  const [state, setState] = useState(false)
  const [onlines, setOnlines] = useState(0)


  console.log(onlines)

  return (

    <Session className="App" socket={socket} setState={setState} setOnlines={setOnlines} >

      {
        state ?
          <Home socket={socket} userDataSocket={state} onlines={onlines}  />
            :
          <Username socket={socket} />

      }




    </Session>

  )
}

export default App
