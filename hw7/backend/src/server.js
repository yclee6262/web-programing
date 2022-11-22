import http from "http";
import express from "express";
import dotenv from "dotenv-defaults";
import mongoose from "mongoose";
import WebSocket from "ws";
import wsConnect from "./wsConnect";

import db from './db'
db.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const database = mongoose.connection
database.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // Define WebSocket connection logic
        ws.onmessage = wsConnect.onMessage(ws);
 });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Listening on http://localhost: ${ PORT}`);
});
