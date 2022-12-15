import { useEffect } from "react"





export const Session = ({ children, socket, setState, setMessagesReceived, setOnlines }) => {


    socket.on("reconnect", (data) => {
        console.log(data)

      });



    useEffect(() => {

        socket.on('disconnect', data => {
            setState(false)
        })

        socket.on('login-user', data => {
            setState(data)

            setMessagesReceived((state) => [
                ...state,
                data
            ])
        })





        return () => socket.off('login-user');

    }, [socket])



    useEffect(() => {


        socket.on('reveb mensage', data => {

            setMessagesReceived((state) => [
                ...state,
                data
            ])


        })

        return () => socket.off('reveb mensage') ;
    },[socket])



    useEffect(() => {

        socket.on('acount-users', data => {
            setOnlines(data)
        })

        return () => socket.off('acount-users');
    }, [socket])




    useEffect(() => {
        socket.on('join-user', (data) => {

        setMessagesReceived((state) => [
            ...state,
            data
        ])
        });


        return () => socket.off('join-user');
    }, [socket]);


    useEffect(() => {
        socket.on('disconnect-user', (data) => {
            console.log(data)
            setMessagesReceived((state) => [
                ...state,
                data
        ])
        });




        return () => socket.off('disconnect-user');
    }, [socket]);



    useEffect(() => {

        socket.on('states', data => {
            console.log(data)
        })







        return () => socket.off('states');

    }, [socket])


    return (
        <div>



            {children}




        </div>
    )
}