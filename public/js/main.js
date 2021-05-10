const chatForm = document.getElementById('chat-form');
const chatMsg = document.getElementsByClassName('chat-messages');

const socket = io();

socket.on('message', message => {
    console.log(message);
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    
    const msgEl = document.createElement('div');
    msgEl.innerHTML = msg;
    msgEl.classList.add('message');
    console.log(msgEl);
    chatMsg[0].appendChild(msg);
    
})