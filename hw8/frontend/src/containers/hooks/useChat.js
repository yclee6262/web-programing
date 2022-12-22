import { useEffect, useState, useContext } from 'react'
import { message } from 'antd'
import { createContext } from 'react'

const LOCALSTORAGE_KEY = 'save-me'
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

const client = new WebSocket('ws://localhost:4000')

const ChatContext = createContext({
    messages: [],
    status: {},
    me: '',
    signedIn: false,
    sendMessage: () => { },
    clearMessages: () => { },
    setMe: () => { },
    startChat: () => { },
    setSignedIn: () => { },
    displayStatus: () => { },
})

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([])
    const [me, setMe] = useState(savedMe || "")
    const [signedIn, setSignedIn] = useState(false)
    const [status, setStatus] = useState({})

    const sendMessage = (name, to, body) => {
        if (!name || !to || !body) throw new Error('Name or to or body required')

        sendData({
            type: 'MESSAGE',
            payload: { name, to, body }
        })
    }

    const clearMessages = (newMessage) => {
        setMessages(newMessage)
    }

    const sendData = (data) => {
        client.send(JSON.stringify(data))
    }

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s
            const content = {
                content: msg,
                duration: 0.5
            }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                    message.error(content)
                    break
                default:
                    message.error(content)
                    break
            }
        }
    }

    const startChat = (name, to) => {
        if (!name || !to) throw new Error('Name or to required')

        sendData({
            type: 'CHAT',
            payload: { name, to }
        })
    }

    client.onmessage = (byteString) => {
        // console.log('recv msg!!')
        const { data } = byteString
        // console.log(data)
        const { type, user1, user2, payload } = JSON.parse(data)
        switch (type) {
            case 'CHATBOX': {
                // console.log(payload)
                let newMessage = messages.filter(({ name, to }) => {
                    return !(((name === user1) && (to === user2)) || ((to === user1)) && (name === user2))
                })
                // console.log('after cleared messages: ' + newMessage)
                setMessages([...newMessage, ...payload])
                break
            }
            case 'MESSAGE': {
                setMessages([...messages, payload])
                break
            }
            case 'STATUS': {
                setStatus(payload)
                break
            }
            // case 'cleared': {
            //     setMessages([])
            //     break
            // }
            default:
                break
        }
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me)
        }
    }, [me, signedIn])

    return (
        <ChatContext.Provider
            value={{
                messages,
                status,
                sendMessage,
                clearMessages,
                me,
                setMe,
                startChat,
                signedIn,
                setSignedIn,
                displayStatus,
            }}
            {...props}
        />
    )
}

function useChat() {
    return useContext(ChatContext)
}

export { ChatProvider, useChat }