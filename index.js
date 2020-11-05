const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");
const cors = require("cors");

require("dotenv/config");
const PORT = process.env.PORT || process.env.DBDEV_PORT; // So we can run on heroku || (OR) localhost:port

const index = express();

// Template engine EJS
index.set("view engine", "ejs");
index.set("views", "views");
 
// Middlewares
index.use(bodyParser.urlencoded({ extended: false }));
index.use(express.static(path.join(__dirname, "public")));

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    index.listen(PORT, () => {
      console.log(`DB connected successfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

