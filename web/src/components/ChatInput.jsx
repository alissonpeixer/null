export const ChatInput = ({ setMensage, sendMensage, mensage }) => {

    const handleMessage = (e) => {
        let newMessage = e.currentTarget.value
        setMensage(newMessage)
    }

    return (

        <input type="text" placeholder="Digite uma mensagem"
            onChange={handleMessage}
            value={mensage}
            onKeyDown={e=> e.code === 'Enter' && sendMensage()}
        />


    )
}