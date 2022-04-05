const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./db/conn');
const socket = require('socket.io');

const port = process.env.PORT || 8000;

const adminRegister = require('../routes/api/adminRegister');
const adminLogin = require('../routes/api/adminLogin');
// const shops = require('../routes/api/shops')
// const products = require('../routes/api/products')
const shops = require('../routes/api/shops');
const adminShop = require('../routes/api/adminShop');
const products = require('../routes/api/products');
const approveRequest = require('../routes/api/approveRequest');

const allUsersRoute = require('../routes/api/auth'); //for chat
const messageRoute = require('../routes/api/messages');

const { userInfo } = require('os');
const { response } = require('express');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.get('/hello', (req, res) => {
  res.send('World');
});

app.use('/api/adminRegister', adminRegister);
app.use('/api/adminLogin', adminLogin);

app.use('/api/shops', shops);
app.use('/api/adminShop', adminShop);

app.use('/api/products', products);

app.use('/api/auth/allusers', allUsersRoute);
app.use('/api/messages', messageRoute);

app.use('/api/approveRequest', approveRequest);

// app.use("/api/messages/addmsg", messageRoute);
// app.use("/api/messages/getmsg", recieveMessageRoute);

const server = app.listen(port, () =>
  console.log(`server is running at port ${port}`)
);

let corsOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

const io = socket(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });

  // approve request
  socket.on('approve-request', (data) => {
    // io.to(friend.receiver).emit('newFriendRequest',{
    //   from:friend.sender,
    //   to:friend.receiver
    // });
    // console.log('new friend request sent');
    console.log('socket approve requset', data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('request-recieve', data.msg);
    }
  });
});
