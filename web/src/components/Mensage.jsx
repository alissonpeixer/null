import { useEffect, useRef } from "react"

export const Mensage = ({ socket, messagesRecieved }) => {
    const myRef = useRef(null);

    let audio = new Audio("/not.mp3")


    useEffect(() => {
        audio.play()
        myRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    },[messagesRecieved])



    return (
        <ul id="chat-areaa" className="chat-area">



            {

                messagesRecieved.map((data, id) => (


                    <li key={id} className="mensage-li">
                            <span>
                                <strong>{data.username} {`>`}</strong>
                            </span>
                            <p>{data.msg}</p>
                    </li>



                ))


            }

            <div ref={myRef}></div>

        </ul>
    )
}