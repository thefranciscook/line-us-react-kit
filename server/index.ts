import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import net from 'net';

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"]
  }
});

// Robot connection
const robotHost = 'line-us.local'; // use line-us IP if it doesn't work (look it up in your router) 
  const robot = new net.Socket();

// Index for looping through commands
let commands: string[] = [];
let cmdIndex: number = -1;

robot.on('data', function (data) {
  console.log('Received: ' + data);

  // last command (or connecting) was successful, so let's send a new command
  if (data.indexOf('hello') === 0 || data.indexOf('ok ') === 0) {
    cmdIndex++;
    if (cmdIndex < commands.length) {
      console.log('Sending: ' + commands[cmdIndex]);
      robot.write(commands[cmdIndex] + '\x00\n');
    } else {
      console.log('Finished!');
      robot.destroy();
    }
  }

  if (data.indexOf('error') === 0) {
    console.log('Error in command ' + cmdIndex);
    console.log('Disconnecting...');
    robot.destroy();
  }
});

robot.on('close', function () {
  console.log('Connection closed');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (msg: string[]) => {
    console.log('Received message:', msg);
    commands = msg;
    cmdIndex = -1;
    robot.connect(1337, robotHost, function () {
      if (commands.length > 0) {
        cmdIndex++;
        console.log('Sending: ' + commands[cmdIndex]);
        robot.write(commands[cmdIndex] + '\x00\n');
      }
    });
  });

  socket.on('disconnect', function () {
    console.log('Client disconnected');
  });
});

server.listen(8081, () => {
  console.log('Server is running on port 8081');
});
