const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config();
app.use(express.json());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const connectDb = require("./config/dbConnect");
// const SocketServer = require("./socketServer");
const globalErrorHandler = require("./helpers/dbErrorHandler");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const port = parseInt(process.env.PORT, 10) || 3000;
connectDb();

io.on("connection", (socket) => {
  socket.on("setup", (currentUser) => {
    socket.join(currentUser._id);
    socket.emit("connected");
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`Join room ${room}`);
  });

  socket.on("new message", (newMessage) => {
    socket
      .in(newMessage.chat._id.toString())
      .emit("message received", newMessage);
  });

  socket.on("update chats", (data) => {
    const { chat } = data;
    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user) => {
      socket.in(user._id).emit("latest message", data);
    });
  });

  socket.on("close room", (room) => {
    // console.log("close room####", room);
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    // socket.leave(socket);
    console.log("Client disconnected.");
  });
});

nextApp.prepare().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compression());
  app.use("/dist", express.static(path.join(process.cwd(), "dist")));
  app.use("/", authRoutes);
  app.use("/", postRoutes);
  app.use("/", userRoutes);
  app.use("/", chatRoutes);
  app.use("/", messageRoutes);
  app.use("/", notificationRoutes);
  app.all("*", (req, res) => handle(req, res));
  app.use(globalErrorHandler);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
