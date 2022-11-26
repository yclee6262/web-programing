import { useRef, useState, useEffect } from 'react'
import { Button, Input, message, Tabs, Tag } from 'antd'
import {useChat} from './hooks/useChat'
import styled from 'styled-components'
import Message from './components/Messages';
import Title from './components/Title';
import ChatModal from './components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px
`;

const ChatRoom = () => {
    const {me, status, messages, sendMessage, clearMessages, displayStatus } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState('')
    const [body, setBody] = useState('');
    const bodyRef = useRef(null)
    const msgFooter = useRef(null)
    

    const displayChat = (chat) => (
        messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) :  ( 
        <ChatBoxWrapper>{
            chat.map(({ from, body }, i) => 
            (<Message fromMe={from === me} message={body} key={i} />))}
            <FootRef ref={msgFooter} />
        </ChatBoxWrapper>)
            // messages.map(({ name, body }, i) => (
            //   <p key={i}>
            //     <Tag color="blue">{name}</Tag> {body}
            //   </p>)))
    );

    const extractChat = (friend) => {
        return displayChat(messages.filter(({from}) => ((from === friend) || (from === me))));
    };

    const createChatBox = (friend) => {
        if(chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box already existed.")
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes, {label: friend, children: chat, key: friend}]);
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);

        return activeKey
        ? activeKey === targetKey
            ? index === 0
                ? ''
                : chatBoxes[index - 1].key
            : activeKey
        : '';
    };

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView
        ({ behavior: 'smooth', block: "start" });
    };

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    return (<>
        <Title name={me} />
        <>
            <ChatBoxesWrapper
                tabBarStyle={{height: '36px'}}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add'){
                        setModalOpen(true)
                    }
                    else if(action === "remove"){
                        setActiveKey(removeChatBox(targetKey, activeKey))
                    }
                }}
                items={chatBoxes}
            />

            <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => { setModalOpen(false);}}
            />

            <Input.Search
            ref={bodyRef}
            enterButton="Send"
            placeholder="Type a message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onSearch={(msg) => {
                if (!msg) {
                    displayStatus({
                    type: 'error',
                    msg: 'Please enter a message.'
                    })
                    return
                } else if (activeKey === ''){
                    displayStatus({
                        type: "error",
                        msg: 'Please add a chatbox first.'
                    });
                    setMsg('')
                    return
                }
                setMsg(msg)
                console.log(msg)
                sendMessage({from: me, to: activeKey, body: msg})
                setMsg('');
                setMsgSent(true);
            }}
        />
    </>
    </>
        

    )
      
//     return (
//       <div className="App">
//         <div className="App-title">
//           <h1>Simple Chat</h1>
//           <Button type="primary" danger onClick={clearMessages}>
//             Clear
//           </Button>
//         </div>
//         <div className="App-messages">
          
//           { messages.length === 0 ? (
//             <p style={{ color: '#ccc' }}> No messages... </p>): 
//             ( messages.map(({ name, body }, i) => (
//               <p key={i}>
//                 <Tag color="blue">{name}</Tag> {body}
//               </p>)))
//           }
//         </div>
//         <Input
//             onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                     bodyRef.current.focus()
//                 }}}
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 style={{ marginBottom: 10 }}
//         ></Input>
//         <Input.Search
//             ref={bodyRef}
//             enterButton="Send"
//             placeholder="Type a message here..."
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             onSearch={(msg) => {
//                 if (!msg || !username) {
//                     displayStatus({
//                     type: 'error',
//                     msg: 'Please enter a username and a message body.'
//                     })
//                     return
//                 }
//                 sendMessage({name: username, body: msg})
//                 setBody('')
//             }}
//         ></Input.Search>
//       </div>
//     )
//   }
}
  export default ChatRoom