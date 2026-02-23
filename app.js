// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 তোমার Firebase config এখানে বসাও
const firebaseConfig = {
  apiKey: "AIzaSyAqtk2RZWI3IzTCqCGqGvSpF_IrTGH9JXA",
  authDomain: "firebss-expore.firebaseapp.com",
  projectId: "firebass-expore",
  appId: "1:928664882087:web:1b090d9c58cff9043f0482"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
window.signUp = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("msg").innerText = "Signup Successful! এখন Sign In করুন";
    })
    .catch(err => {
      document.getElementById("msg").innerText = err.message;
    });
}

// Sign In
window.signIn = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(err => {
      document.getElementById("msg").innerText = err.message;
    });
}
