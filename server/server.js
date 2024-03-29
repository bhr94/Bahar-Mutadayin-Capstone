const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const apiRoutes = require("./routes/api");
const io = require("socket.io")();

// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
app.use(cors());
var corsUrl;

if (process.env.NODE_ENV === "development") {
  corsUrl = process.env.LOCAL_URL; // http://localhost:8080
} else if (process.env.NODE_ENV === "production") {
  corsUrl = process.env.DEPLOY_URL; // http://myapp.com
}

app.use(
  cors({
    origin: corsUrl,
  })
);
app.use(passport.initialize());
require("dotenv").config(); // used to load .env file process.env.VARIABLE_NAME
// const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;
const PORT = process.env.PORT || 5000;
app.use(express.json());
console.log("env vars: " + process.env.PORT);
// let user = {};

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

// console.log(FACEBOOK_CLIENT_ID);
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "email"],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       user = { ...profile };
//       return cb(null, profile);
//     }
//   )
// );
// facebook auth routing
// app.get("/auth/facebook", passport.authenticate("facebook"));
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     console.log("success");

//     res.redirect("http://localhost:3000/profile");
//   }
// );



io.on("connection", (socket) => {
  socket.emit("message", "Welcome to FriendShip");
});
//  routing
app.get("/profile", (req, res) => {
  res.json(user);
});

// main route
app.use("/", apiRoutes);

// logout from facebook session
app.get("/logout", function (req, res) {
  user = {};
  req.logout();
  // res.redirect('/signin');
  res.json("hello");
});

app.listen(PORT, () => {
  console.log(`The server is listening to the port ${PORT}`);
});
