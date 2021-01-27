const express = require("express");
const app = express();
const router = require("./routes/index");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", router);
io.on("connection", (socket) => {
  // welcome current user
  socket.emit("message", "Welcome");
  // Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  // disconnect the user
  socket.on("disconnect", (user) => {
    io.emit("message", `${user} has left the chat`);
  });

  // Listen to chat messages
  socket.on("chatMessage", (message) => {
    io.emit('message', 'message is sent');
  });

  // socket.on('join', (name) =>{
  //   console.log(`${name} has joined the chat`)
  // })
});
http.listen(PORT, () => {
  console.log(`The server is listening to the port ${PORT}`);
});
