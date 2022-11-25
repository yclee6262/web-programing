import { useRef, useState, useEffect } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {useChat} from './hooks/useChat'

const ChatRoom = () => {
    const {status, messages, sendMessage, clearMessages } = useChat()
    const [username, setUsername] = useState('');
    const [body, setBody] = useState('');
    const bodyRef = useRef(null)
  
    const displayStatus = (s) => {
      if (s.msg) {
        const { type, msg } = s;
        const content = {content: msg, duration: 1 }
        switch (type) {
          case 'success': 
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }}}
    
    useEffect(() => {
    displayStatus(status)},[status])
    // console.log(messages)
     
    return (
      <div className="App">
        <div className="App-title">
          <h1>Simple Chat</h1>
          <Button type="primary" danger onClick={clearMessages}>
            Clear
          </Button>
        </div>
        <div className="App-messages">
          
          { messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>): 
            ( messages.map(({ name, body }, i) => (
              <p key={i}>
                <Tag color="blue">{name}</Tag> {body}
              </p>)))
          }
        </div>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            bodyRef.current.focus()
            }}}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 10 }}
        ></Input>
        <Input.Search
          ref={bodyRef}
          enterButton="Send"
          placeholder="Type a message here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onSearch={(msg) => {
            if (!msg || !username) {
              displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
              })
              return
            }
            sendMessage({name: username, body: msg})
            setBody('')
          }}
        ></Input.Search>
      </div>
    )
  }

  export default ChatRoom