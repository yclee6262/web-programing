import Message from "../models/message"
import {UserModel, MessageModel, ChatBoxModel, SimpleMessageModel} from "../models/chatbox"; 
import mongoose from "mongoose";


const makeName = (from, to) => {return [from, to].sort().join('_');};
const validateUser = async (name) => {
    console.log("Finding..." + name);
    const existing = await UserModel.findOne({name});
    console.log(existing);
    if (existing) return existing
}

const validateChatBox = async (roomName, sender) => {
    let box = await SimpleMessageModel.findOne({ roomName });
    // let box = await ChatBoxModel.findOne({ name });
    if (!box){
        box = await new SimpleMessageModel(roomName, sender)
    }

    ({ name, users: participants }).save();
    return box.populate
    (["users", {path: 'messages', populate: 'sender' }]);
   };

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data)); };
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws); };
    
const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

export default {
    initData: (ws) => {
        Message.find().sort({ created_at: -1 }).limit(100).exec((err, res) => {
            if (err) throw err;
            // initialize app with existing messages
            sendData(["init", res], ws);
        });
    },

    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const {type, payload} = JSON.parse(data)
            const chatBoxes = {};
            // console.log(type);
            // console.log(payload);
            switch (type) {
                case 'CHAT': { // open new chatbox
                    let chatBoxName = makeName(payload.from, payload.to);
                    if(!chatBoxes[chatBoxName]){
                        console.log("add new chatbox");
                        chatBoxes[chatBoxName] = new Set()
                    }
                    console.log("Room: " + chatBoxName);
                    chatBoxes[chatBoxName].add(ws);
                    // console.log(chatBoxes);
                    const s = new SimpleMessageModel();
                    s.chatbox = chatBoxName;
                    s.save();
                    // if (ws.box !== "" && chatBoxes[ws.box])
                    //     // user(ws) was in another chatbox
                    //     chatBoxes[ws.box].delete(ws);
                    break;
                };
                case 'MESSAGE': { // pass messages
                    const { from, to ,body } = payload
                    console.log(payload);
                    // Save payload to DB
                    // var u = new UserModel();
                    // var c = new ChatBoxModel();
                    // var m = new MessageModel();
                    const message = new Message({from, to, body})
                    console.log(message);
                    try { await message.save();
                    } catch(e) {throw new Error ("Message DB save error: " + e);}
                    broadcastMessage(
                        wss,
                        ['output', [payload]],
                        {
                            type: 'success',
                            msg: 'Message sent.'
                        });
                        
                    // Respond to client
                    // sendData(['output', [payload]], ws)
                    // sendStatus({
                    //     type: 'success',
                    //     msg: 'Message sent.'
                    // }, ws)
                    break;
                };
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(
                            wss,
                            ['cleared'],
                            { type: 'info', msg: 'Message cache cleared.'})
                    })
                    // sendData(['cleared'], ws)
                    // sendStatus
                    // ({ type: 'info', msg: 'Message cache cleared.'}, ws)
                    // })
                    break
                }
                default: break;
            }
        }
    )
}