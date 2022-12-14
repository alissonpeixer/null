
import { useState } from 'react'
import './App.css'
import { Session } from './modules/Session'




function App() {
  const [username, setUsername] =  useState('')
  return (
    <Session className="App" username={setUsername} >

      <h1>Olá {username}</h1>



    </Session>
  )
}

export default App
