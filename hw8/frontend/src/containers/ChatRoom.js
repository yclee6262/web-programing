import { useEffect, useState } from 'react'
import { React, useRef } from 'react'
import { Tabs, Input } from 'antd'
import styled from 'styled-components'
import Title from '../components/Title'
import Message from '../components/Message'
import { useChat } from './hooks/useChat'
import ChatModal from '../components/ChatModal'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`


const FootRef = styled.div`
    height = 20px;
`


export default function ChatRoom() {
    const { me, messages, sendMessage, clearMessages, startChat, displayStatus } = useChat()

    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false)

    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const msgRef = useRef(null)
    const msgFooter = useRef(null)

    const displayMessages = (chat) => {
        return chat.length === 0 ?
            <p style={{ color: '#ccc' }}>
                No messages...
            </p> :
            chat.map(({ name, body }, i) => {
                return <Message name={name} isMe={name === me} message={body} key={i} />
            })
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.")
        }
        startChat(me, friend)
        return friend
    }

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey)
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey)
        setChatBoxes(newChatBoxes)

        let newMessage = messages.filter(({ name, to }) => {
            // console.log('name/to is: ' + name + ' / ' + to)
            return !(((name === targetKey) && (to === me)) || ((to === targetKey)) && (name === me))
        })
        clearMessages(newMessage)

        return (
            activeKey ?
                activeKey === targetKey ?
                    index === 0 ?
                        '' : chatBoxes[index - 1].key
                    : activeKey
                : ''
        )
    }

    const renderChat = (chat) => {
        return (
            <ChatBoxWrapper>
                {displayMessages(chat)}
                <FootRef ref={msgFooter} />
            </ChatBoxWrapper>
        )
    }


    const extractChat = (friend) => {
        let chat = renderChat(messages.filter(({ name, to, body }) => {
            return (((name === friend) && (to === me)) || ((to === friend)) && (name === me))
        }))
        let exist = chatBoxes.findIndex(({ key }) => key === friend)
        // console.log('exist = ' + exist)

        let boxes = chatBoxes
        if (exist < 0) {
            boxes = [...chatBoxes, {
                label: friend,
                key: friend,
                children: null
            }]
        }
        let newChatBoxes = boxes.map((box) => {
            if (box.key === friend) {
                box.children = chat
            } else {
                box.children = null
            }
            return box
        })
        setChatBoxes(newChatBoxes)
        setMsgSent(true)
        return
    }


    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])

    useEffect(() => {
        if (activeKey !== '') {
            console.log('key change!!')
            extractChat(activeKey) //DOM
        }
    }, [activeKey, messages])

    // useEffect(() => {
    //     console.log('key change to: ' + activeKey)
    // }, [activeKey])

    // useEffect(() => {
    //     console.log('chatboxes change to: ' + chatBoxes)
    // }, [chatBoxes])

    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{ height: '36px' }}
                    type='editable-card'
                    activeKey={activeKey}
                    onChange={(key) => {
                        if (key !== '') {
                            startChat(me, key)
                        }
                        setActiveKey(key)
                        // extractChat(key) // show DOM
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true)
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey))
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name))
                        // extractChat(name)
                        setModalOpen(false)
                    }}
                    onCancel={() => {
                        setModalOpen(false)
                    }}
                />
            </>
            <Input.Search
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                ref={msgRef}
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a message body.'
                        })
                        return
                    }
                    if (activeKey === '') {
                        displayStatus({
                            type: 'error',
                            msg: 'Please open a chatBox first.'
                        })
                        return
                    }
                    sendMessage(me, activeKey, msg)
                    setMsg('')
                    setMsgSent(true)
                }}
            ></Input.Search>
        </>
    )
}
