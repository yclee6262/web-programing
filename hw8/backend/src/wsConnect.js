import { MessageModel, UserModel, ChatBoxModel } from "./models/chatbox.js"

const makeName = (name, to) => {
    return [name, to].sort().join('_')
}

const validateUser = async (name) => {
    // console.log("Finding..." + name)
    let user = await UserModel.findOne({ name })
    if (!user) {
        user = await new UserModel({ name }).save()
        console.log('create user: \n' + user)
    }
    return user
}

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name })
    if (!box) {
        box = await new ChatBoxModel({
            name,
            users: participants,
        }).save()
        console.log('create chatBox: \n' + box)
    }
    return box.populate(["users", { path: 'messages', populate: 'sender' }])
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
    sendData({
        type: 'STATUS',
        payload
    }, ws)
}

const broadcastMessage = (data, status, chatBoxName) => {
    chatBoxes[chatBoxName].forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

const chatBoxes = {}
export default {
    clean: (ws) => {
        // console.log(chatBoxes)
        if (ws.box !== "" && chatBoxes[ws.box]) {
            chatBoxes[ws.box].delete(ws)
        }
        console.log("clean completed")
        // console.log(chatBoxes)
    },
    onMessage: (ws, wss) =>
        async (byteString) => {
            // console.log('got byteString ' + byteString)
            const { data } = byteString
            // console.log('got data ' + data)
            // console.log('after parse ' + JSON.parse(data))

            const { type, payload } = JSON.parse(data)
            let { name, to, body } = payload
            let chatBoxName = makeName(name, to)
            // console.log('got type ' + type)
            // console.log('got payload ' + payload)
            if (!chatBoxes[chatBoxName]) {
                chatBoxes[chatBoxName] = new Set()
            }
            switch (type) {
                case 'CHAT': {
                    chatBoxes[chatBoxName].add(ws)
                    if (ws.box !== "" && chatBoxes[ws.box] && ws.box !== chatBoxName) {
                        // user(ws) was in another chatbox
                        chatBoxes[ws.box].delete(ws)
                    }
                    ws.box = chatBoxName

                    let user1 = await validateUser(name)
                    let user2 = await validateUser(to)
                    // console.log('now:' + user1._id)
                    // console.log('now:' + user2._id)
                    let chatBox = await validateChatBox(chatBoxName, [user1, user2])
                    await user1.updateOne({
                        name: user1.name,
                        chatBoxes: [...user1.chatBoxes, chatBox]
                    })


                    let { messages } = chatBox

                    let payload = messages.map((message) => {
                        let sender = message.sender.name
                        return {
                            name: (sender === name) ? name : to,
                            to: (sender === name) ? to : name,
                            body: message.body
                        }
                    })
                    // console.log(messages)
                    let data = {
                        type: 'CHATBOX',
                        user1: user1.name,
                        user2: user2.name,
                        payload
                    }
                    let status = {
                        type: 'success',
                        msg: 'ChatBox found.'
                    }
                    broadcastMessage(data, status, chatBoxName)
                    break
                }
                case 'MESSAGE': {
                    let user1 = await validateUser(name)
                    let user2 = await validateUser(to)
                    let chatBox = await validateChatBox(chatBoxName, [user1, user2])
                    let newMessage = await new MessageModel({
                        chatBox,
                        sender: user1,
                        body,
                    }).save()
                    await chatBox.updateOne({
                        name: chatBox.name,
                        users: chatBox.users,
                        messages: [...chatBox.messages, newMessage]
                    })
                    // console.log('new message send: \n' + newMessage)
                    let data = {
                        type: 'MESSAGE',
                        payload: {
                            name,
                            to,
                            body
                        }
                    }
                    let status = {
                        type: 'success',
                        msg: 'Message Send.'
                    }
                    broadcastMessage(data, status, chatBoxName)

                    break
                }
                case 'CLEAR': {
                    // Message.deleteMany({}, () => {
                    //     let data = ['cleared']
                    //     let status = {
                    //         type: 'info',
                    //         msg: 'Message cache cleared.'
                    //     }
                    //     broadcastMessage(wss, data, status)
                    // })
                    break
                }
                default:
                    break
            }
        }




}