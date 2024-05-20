const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] })); // 여러 origin 허용

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // 여러 origin 허용
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('offer', (data) => {
    console.log('Offer received', data); // Offer 수신 확인용 로그
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    console.log('Answer received', data); // Answer 수신 확인용 로그
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    console.log('Candidate received', data); // Candidate 수신 확인용 로그
    socket.broadcast.emit('candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
