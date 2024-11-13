import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (msg: string[]) => {
    console.log('Received message:', msg);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8081, () => {
  console.log('Socket.IO server running on port 8081');
});