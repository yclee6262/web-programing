import { useState } from "react";
const useChat = () => {
 const [messages, setMessages] = useState([]);
 const [status, setStatus] = useState({});
 const sendMessage = (msg) => {
    setMessages(msg.messages); // update messages and status
    setStatus({
        type: "success",
        msg: "Messages sent"
    })
    console.log(msg);
 }
 return {
    status, messages, sendMessage
};
};
export default useChat;