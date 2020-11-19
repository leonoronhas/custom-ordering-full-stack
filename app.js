const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");
const cors = require("cors");
const flash = require("connect-flash"); // special area of the session used for storing messages
const MongoDBStore = require("connect-mongodb-session")(session); // Do not forget to pass your session

require("dotenv/config");
const errorController = require("./controllers/error");
const PORT = process.env.PORT || process.env.DBDEV_PORT; // So we can run on heroku || (OR) localhost:port

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

// Template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

app.use("/project", projectRoutes);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

// Session saved in DB to handle multiple users with hashed cookie
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Default Routes
app.use(authRoutes);

// Handle different domains
const corsOptions = {
  origin: "https://custom-cnc.herokuapp.com/",
  optionsSuccessStatus: 200,
};

// 404 handler
app.use(errorController.get404).use(cors(corsOptions));

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`DB connected successfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
