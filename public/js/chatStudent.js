import {io} from 'socket.io-client'

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io('http://localhost:3000');
socket.on('connect', () =>{
  document.getElementById("connection_id").innerHTML = socket.id;
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message, true);
  socket.emit('send-message', message, room);

  messageInput.value = "";
});

socket.on('recieve-message',(message) => {
  displayMessage(message, false);
})

function displayMessage(message, isSelf) {
  const div = document.createElement("div");
  div.textContent = message;
  if (isSelf) div.classList.add('self-message');
  document.getElementById("message-container").append(div);
}
