const express = require('express');
const logger = require('./middleware/logger');
const router = require('./routes/bookRoute');
const error = require('./middleware/error-404');
const viewRoute = require('./routes/viewRoute.js')
const indexRoute = require('./routes/index');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/books', router);
app.use('/books', viewRoute);
app.use('/', indexRoute)
app.use(logger);
app.use(error);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

io.on('connection', (socket) => {
  const { id } = socket
  console.log(`Socket connected: ${id}`)

  const { roomName } = socket.handshake.query
  console.log(`Socket roomName: ${roomName}`)

  socket.join(roomName)

  socket.on('message-to-room', (msg) => {
    msg.type = `roomName: ${roomName}`
    socket.to(roomName).emit('message-to-room', msg)
    socket.emit('message-to-room', msg)
  })

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`)
  })
})

async function start(PORT, UrlDB) {
  try {
    await mongoose.connect(UrlDB);
    app.listen(PORT);
    console.log(`Сервер запущен: порту 8081, подключен к БД через порт ${UrlDB}`);
  } catch (e) {
    console.log('Ошибка подключения БД ', e);
  }
}

const UrlDB = process.env.UrlDB || 'mongodb://root:example@mongo:27017/';
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);