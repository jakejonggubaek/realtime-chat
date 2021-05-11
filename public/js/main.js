const chatForm = document.getElementById('chat-form');
const chatMsg = document.querySelector('.chat-messages');

// Get username & Room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//Join Chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

//message from server
socket.on('message', message => {
    outputMessage(message);

    //scroll down
    chatMsg.scrollTop = chatMsg.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text 
    const msg = e.target.elements.msg.value;
    
    //Emit message to server
    socket.emit('chatMessage', msg);

    //clear input box
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

const outputMessage = (msgObj) => {
    const divEl = document.createElement('div');
    divEl.classList.add('message');
    divEl.innerHTML = 
        `
            <p class="meta">${msgObj.username}
                <span>${msgObj.time}</span></p>
            <p class="text">
                ${msgObj.text}
            </p>
        `;
    chatMsg.appendChild(divEl);
}

// Add room name to DOM
const outputRoomName = (room) => {
    const roomName = document.getElementById('room-name');
    roomName.innerText = room;
};

const outputUsers = (users) => {
    const userList = document.getElementById('users');

    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
    
};