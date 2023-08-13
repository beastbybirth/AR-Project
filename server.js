// server.js

// Require dependencies
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const connectDB = require("./config/db");
const expressSession = require("express-session");
const io = require("socket.io");
const http = require("http");
const { initializingPassport, isAuthenticated } = require("./config/passport");

//creating the socket server
const server = http.createServer(app);
const socketIoServer = io(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

socketIoServer.on("connection", (socket) => {
  console.log(socket);
  socket.on("join-room", (userId) => {
    console.log(userId);
    socket.join(userId);
  })
  socket.on("send-message", (message, room) => {
    console.log("ROOM: " + room);
    if (room === "") socket.broadcast.emit("recieve-message", message);
    else socket.to(room).emit("recieve-message", message);
    console.log(message);
  });
});
// Load environment variables from .env file
dotenv.config();

//connect to database
connectDB();

//initialise passport
initializingPassport(passport);

// Middleware for parsing request bodies and handling sessions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static assets from the public folder
app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("tiny"));

// Routes
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const registerRoutes = require("./routes/registerRoutes");

// Use the routes
app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/register", registerRoutes);

/* some functions */
const isTeacher = (req, res) => {
  if (req.isAuthenticated()) {
    return req.user.role === "teacher";
  } else res.redirect("/auth/login");
};
/* Actual endpoints */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/welcome", (req, res) => {
  if (isTeacher(req, res)) {
    console.log("teacher logged");
    res.redirect("teachers/welcome");
  } else {
    console.log("student logged");
    res.render("students/welcome");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {console.log("listening on port")});
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
