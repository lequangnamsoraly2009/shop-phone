require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
// const passport = require("passport");
// const session = require("express-session");

const db = require("./database/config.db");
// Passport

// require("./helper/passport")(passport);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// app.use(session({ resave: false,
//   saveUninitialized: true,
//   secret: 'SECRET' }));
// app.use(passport.initialize());
// app.use(passport.session());

//Routes
app.use("/users", require("./routes/user.route"));
app.use("/api", require("./routes/category.route"));
app.use("/api", require("./routes/payment.route"));
app.use("/api/admin", require("./routes/uploadImage.route"));
app.use("/api", require("./routes/product.route"));

//Connect Mongoose
db.onConnection();

const port = process.env.PORT || 5000;
// const port = 3001;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Config socketio
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
