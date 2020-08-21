require('dotenv').config();
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketio = require('socket.io');
const http = require('http');

const app = express();
const initializePassport = require('./passport-config.js');
const server = http.createServer(app);
const io = socketio(server);
const authRoutes = require("./routes/authRoutes");
const channelRoutes = require('./routes/channelRoutes');
const chatRoutes = require('./routes/chatRoutes');
const User = require('./models/user');
const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

mongoose.connect('mongodb://localhost/chatapp', 
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => {
    console.log("Mongoose Is Connected");
});
mongoose.Promise = global.Promise;

// Passport
initializePassport(passport, (username) => {
    return User.findOne({ username: username }, (err, user) => {
        return user
    })
}, id => {
    return User.findById({ _id: id }, (err, user) => {
        return user
    })
});

// Socket.io
io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text: `Welcome ${user.name}`});

        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

        // Join a user in a room
        socket.join(user.room);

        callback();

    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user)
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `User ${user.name} has left`})
        }
    });

});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
);
app.use(flash());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/chat', chatRoutes);
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});
server.listen(3050);