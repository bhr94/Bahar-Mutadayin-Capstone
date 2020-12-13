var admin = require("firebase-admin");
const firebase = require("firebase")
require("firebase/auth");
var serviceAccount = require("./service-account.json");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0I1Hy3U65WeufH2M3hy0rRCta9CrNOHw",
  authDomain: "capstone-e808d.firebaseapp.com",
  projectId: "capstone-e808d",
  storageBucket: "capstone-e808d.appspot.com",
  messagingSenderId: "877402167614",
  appId: "1:877402167614:web:49d68e430df6aecf7cf46f",
  measurementId: "G-VY3J8C22J2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {firebase, admin}