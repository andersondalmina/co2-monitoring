import { io } from "socket.io-client";

console.log("Connecting client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("disconnect", () => {
  console.log(socket.id);
});

function sendData() {
  console.log("enviado dados");
  socket.emit("data", { sensor: "1A2B", value: 10 });
  setTimeout(sendData, 5000);
}

sendData();
