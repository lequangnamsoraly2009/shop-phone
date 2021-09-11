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

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

// app.use(express.json());
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
app.use("/api", require("./routes/reviewComment.route"));
app.use("/api", require("./routes/questionProduct.route"));
app.use("/api", require("./routes/voucher.route"));
app.use("/api", require("./routes/pdf.route"));
app.use("/api", require("./routes/notification.route"));



//Connect Mongoose
db.onConnection();

const port = process.env.PORT || 5000;
// const port = 3001;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Config socketio
const io = require("socket.io")(server);
const ReviewComments = require("./models/reviewComment.model");

io.on("connection", (socket) => {
  // console.log("Connected: " + socket.id);

  socket.on("joinRoomReviewsProduct", async (id) => {
    let users = [];

    // Xem 1 kết nối là 1 user và gán cho nó id của socket
    // Room có giá trị là của detailProduct id -> Id của product là 1 room id
    const user = { userId: socket.id, room: id };
    // Kiểm tra trong danh sách các users có user nào không trùng với socket vừa kết nối ko
    const check = users.every((user) => user.userId !== socket.id);
    // Nếu có trungf -> Thì thêm socket vừa kết nối vào list users của socket
    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id) {
          if (user.room !== id) {
            socket.leave(user.room);
            socket.join(user.room);
            user.room = id;
          }
        }
      });
    }
  });

  socket.on("createCommentReview", async (msg) => {
    const { userName, avatar,  message, rating, title, product_id, createdAt, send } =
      msg;

    const newReview = new ReviewComments({
      userName,
      avatar,
      message,
      rating,
      title,
      product_id,
      createdAt,
    });

    if (send === "replyReview") {
      const { _id, userName, avatar , message, title, product_id, createdAt, rating } =
      newReview;

      const review = await ReviewComments.findById(product_id);

      if (review) {
        review.replies.push({ _id, avatar,userName, message, createdAt});

        await review.save();
        io.to(review.product_id).emit("sendReplyReviewToClient", review); 
      }
    } else {
      await newReview.save();
      io.to(newReview.product_id).emit("sendReviewToClient", newReview);
    }
  });

  // Socket get data notification ?
  socket.on("get-data-notification", async(data)=> {
    console.log(data)
  })

  socket.on("disconnect", () => {
    // console.log("Disconnected: " + socket.id);
  });
});
