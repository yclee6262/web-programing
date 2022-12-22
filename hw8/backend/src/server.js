import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import mongo from './mongo'
import WebSocket from 'ws'
import wsConnect from './wsConnect'

mongo.connect()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    console.log('MongoDB connected!')

    wss.on('connection', (ws) => {
        console.log("client connect")
        ws.box = ''
        // wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(ws, wss)
        ws.onclose = () => {
            console.log("client disconnect")
            wsConnect.clean(ws)
        }
    })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})

