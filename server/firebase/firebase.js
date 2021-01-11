var admin = require("firebase-admin");
const firebase = require("firebase");
require("firebase/auth");
var serviceAccount = require("./service-account.json");
const firebaseSecrets = require("./firebase_secret_keys");
// Your web app's Firebase configuration
const firebaseConfig = firebaseSecrets;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { firebase, admin };
