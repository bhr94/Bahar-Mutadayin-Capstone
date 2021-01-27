var admin = require("firebase-admin");
const firebase = require("firebase");
require("firebase/auth");
var serviceAccount = require("./service-account.json");
// const firebaseSecrets = require("./firebase_secret_keys");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4O95VILjqcFyQCTOBJ4jmasdShD34hRc",
  authDomain: "friendship-1607996149445.firebaseapp.com",
  projectId: "friendship-1607996149445",
  storageBucket: "friendship-1607996149445.appspot.com",
  messagingSenderId: "472149976150",
  appId: "1:472149976150:web:eb9198978ed5c8d87387f7",
  measurementId: "G-NM67635KQ0",
};;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { firebase, admin };
