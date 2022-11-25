import { useState } from "react";
import { message } from "antd";
import { createContext, useContext } from "react";

const client = new WebSocket('ws://localhost:4000');

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
    clearMessages: () => {},
   });

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false)
    const [me, setMe] = useState('')

    const clearMessages = () => {
        sendData(["clear"]);
    };
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
        await client.send(JSON.stringify(data));
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

    const sendMessage = (payload) => {
        // setMessages([...messages, payload]); // update messages and status
        // setStatus({
        //     type: "success",
        //     msg: "Message sent"
        // });
        console.log(payload);
        sendData(["input", payload])
    };
    
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                setMessages(() =>
                [...messages, ...payload]); 
                break; 
            }
            case "status":{
                setStatus(payload);
                break;
            }
            case "init":{
                setMessages(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }    
            default: break;


        }
    }

    return (
        <ChatContext.Provider
        value={{status, messages, sendMessage, clearMessages, setSignedIn, setMe, me, signedIn, displayStatus}}
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