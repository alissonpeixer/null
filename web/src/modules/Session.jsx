import { useEffect, useState } from "react"





export const Session = ({ children, socket, setState, setOnlines }) => {



    useState(() => {
        setOnlines(+1)
    },[])


    useEffect(() => {

        socket.on('login-user', data => {
            setState(data)
        })



        return () => socket.off('login-user');

    },[socket])






    return (
        <div>



            {children}




        </div>
    )
}