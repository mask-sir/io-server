const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let userCount = 0;

io.on("connection", (socket) => {
  userCount++;
  io.emit("userCount", userCount);

  socket.on("disconnect", () => {
    userCount--;
    io.emit("userCount", userCount);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});