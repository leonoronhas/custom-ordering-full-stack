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

// CSRF - Cross Site Request Forgery
const csrfProtection = csrf();

// Redirect to HTTPS to avoid Heroku privacy url warning
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// Template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const openLinksRoutes = require("./routes/open-links");
const adminRoutes = require("./routes/admin");
const accountRoutes = require("./routes/account");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

// Add csrf protection after the session has been created
app.use(csrfProtection);

/* Tell express to load this for every view EXPRESS LOCALS
Add the following anywhere where there is a POST form

  <!-- Do not forget to add the token and the name "_csrf"-->
  <!-- THE NAME MUST BE "_csrf"-->
  <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
*/
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.csrfToken = req.csrfToken();
  next(); // Do not forget this
});
/* END OF EXPRESS LOCALS */

// Default Routes
app.use("/project", projectRoutes);
app.use(authRoutes);
app.use(openLinksRoutes);
app.use("/admin", adminRoutes);
app.use(accountRoutes);

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
