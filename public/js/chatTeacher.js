import { io } from 'socket.io-client';

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const studentList = document.getElementById("student-list");
const messageContainer = document.getElementById("message-container");

let selectedStudentId = ""; 

// Fetch the student list
fetch('/teachers/get-student')
  .then(response => response.json())
  .then(students => {
    students.forEach(student => {
      const listItem = document.createElement("li");
      listItem.textContent = student.name;
      listItem.dataset.studentId = student.id;
      listItem.classList.add("student-item");
      studentList.appendChild(listItem);
    });
  });

// Handle student click event
studentList.addEventListener("click", event => {
  const clickedItem = event.target.closest(".student-item");
  if (clickedItem) {
    selectedStudentId = clickedItem.dataset.studentId;
  }
});

const socket = io('http://localhost:3000');
socket.on('connect', (socket) => {
  document.getElementById("connection_id").innerHTML = socket.id;
  const userId = socket.request.user.id;
  socket.emit('join-room', {userId});
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = selectedStudentId;

  if (message === "") return;
  displayMessage(message, true);
  socket.emit('send-message', message, room);

  messageInput.value = "";
});

socket.on('recieve-message', (message) => {
  displayMessage(message, false);
});

function displayMessage(message, isSelf) {
  const div = document.createElement("div");
  div.textContent = message;
  if (isSelf) div.classList.add('self-message');
  document.getElementById("message-container").append(div);
}
