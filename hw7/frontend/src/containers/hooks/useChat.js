import { useState, useEffect } from "react";
import { message } from "antd";
import { createContext, useContext } from "react";

const client = new WebSocket('ws://localhost:4000');
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
   });

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false)
    const [me, setMe] = useState(savedMe || '')

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "CHAT": {
                console.log("CHAT")
                setMessages(payload);
                break;
            }
            case "MESSAGE": {
                console.log("MESSAGE")
                setMessages(() =>
                [...messages, payload]);
                setStatus(payload);
                
                break; 
            }
            // case "status":{
            //     setStatus(payload);
            //     break;
            // }
            // case "init":{
            //     setMessages(payload);
            //     break;
            // }
            // case "cleared": {
            //     setMessages([]);
            //     break;
            // }
            default: break;
        }
    }


    //  client.onmessage = (byteString) => {
    //     const {data} = byteString;
    //     const [task, payload] = JSON.parse(data);
    //     switch(task){
    //         case "output": {
    //             setMessages(() => [...messages, ...payload]); 
    //             break;}
    //         default: break;
    //     }
    //  }

    const sendData = async (data) => {
        console.log(data);
        await client.send(JSON.stringify(data));
        // await console.log("data to backend")
    };

    const clearMessages = () => {
        sendData(["clear"]);
    };

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


    const startChat = (from, to) =>{
        if (!from || !to) throw new Error('From or to required.');
        console.log("usechat starting chat")
        sendData({
            type: 'CHAT',
            payload: {from, to},
        })
        console.log("usechat startChat data sent");
    }

    const sendMessage = (message) => {
        let from = message.from
        let to = message.to
        let body = message.body
        // console.log(from)
        if(!from || !to || !body){
            console.log("missssssssss");
            throw new Error("something else required");
        }
        console.log("message sent");
        sendData({
            type: 'MESSAGE',
            payload: {from, to, body}
        })
    };

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }}, [me, signedIn]);

    return (
        <ChatContext.Provider
        value={{status, messages, sendMessage, clearMessages, setSignedIn, setMe, me, signedIn, displayStatus, startChat}}
        {...props}
        />
    );
};

const useChat = () =>  useContext(ChatContext);
export {ChatProvider, useChat};

// const useChat = () => {
//     const [messages, setMessages] = useState([]);
//     const [status, setStatus] = useState({});
//     const [signedIn, setSignedIn] = useState(false)
//     const [me, setMe] = useState('')


    
//     const clearMessages = () => {
//         sendData(["clear"]);
//     };
//     //  client.onmessage = (byteString) => {
//     //     const {data} = byteString;
//     //     const [task, payload] = JSON.parse(data);
//     //     switch(task){
//     //         case "output": {
//     //             setMessages(() => [...messages, ...payload]); 
//     //             break;}
//     //         default: break;
//     //     }
//     //  }

//     const sendData = async (data) => {
//         await client.send(JSON.stringify(data));
//     };

//     const displayStatus = (s) => {
//         if (s.msg) {
//         const { type, msg } = s;
//         const content = {content: msg, duration: 1 }
//         switch (type) {
//             case 'success': 
//             message.success(content)
//             break
//         case 'error':
//         default:
//             message.error(content)
//             break
//         }}}

//     const sendMessage = (payload) => {
//         // setMessages([...messages, payload]); // update messages and status
//         // setStatus({
//         //     type: "success",
//         //     msg: "Message sent"
//         // });
//         console.log(payload);
//         sendData(["input", payload])
//     };
    
//     client.onmessage = (byteString) => {
//         const { data } = byteString;
//         const [task, payload] = JSON.parse(data);
//         switch (task) {
//             case "output": {
//                 setMessages(() =>
//                 [...messages, ...payload]); 
//                 break; 
//             }
//             case "status":{
//                 setStatus(payload);
//                 break;
//             }
//             case "init":{
//                 setMessages(payload);
//                 break;
//             }
//             case "cleared": {
//                 setMessages([]);
//                 break;
//             }    
//             default: break;


//         }
//     }

//     return {
//         status, messages, sendMessage, clearMessages, setSignedIn, setMe, me, signedIn, displayStatus
//     };
// };
// export default useChat;