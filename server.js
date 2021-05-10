const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when clients connect
io.on('connection', socket => {
    
    // Welcome to current user
    socket.emit('message', 'Welcome to Junocord');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined chat');

    //Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left chat');
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));