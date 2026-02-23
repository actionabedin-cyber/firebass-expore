import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// তোমার Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAqtk2RZWI3IzTCqCGqGvSpF_IrTGH9JXA",
  authDomain: "firebss-expore.firebaseapp.com",
  projectId: "firebass-expore",
  appId: "1:928664882087:web:1b090d9c58cff9043f0482"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 AUTO LOGIN CHECK
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "dashboard.html";
  }
});

// 🔐 SIGN UP
window.signUp = function() {
  const email = emailInput();
  const password = passInput();
  const msg = getMsg();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      msg.innerText = "Signup successful! এখন login করুন";
    })
    .catch(err => handleError(err, msg));
}

// 🔓 SIGN IN
window.signIn = function() {
  const email = emailInput();
  const password = passInput();
  const msg = getMsg();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => handleError(err, msg));
}

// 🚪 LOGOUT
window.logout = function() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

// 🔒 PROTECTED PAGE CHECK
if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById("userEmail").innerText = user.email;
    }
  });
}

// 🎯 HELPERS
function emailInput() {
  return document.getElementById("email").value;
}

function passInput() {
  return document.getElementById("password").value;
}

function getMsg() {
  return document.getElementById("msg");
}

// 💬 ERROR HANDLER
function handleError(err, msg) {
  if (err.code === "auth/invalid-email") {
    msg.innerText = "Enter a valid email.";
  } 
  else if (err.code === "auth/user-not-found") {
    msg.innerText = "User not found.";
  }
  else if (err.code === "auth/wrong-password") {
    msg.innerText = "Wrong password.";
  }
  else if (err.code === "auth/email-already-in-use") {
    msg.innerText = "Email already used.";
  }
  else {
    msg.innerText = "Something went wrong.";
  }
}
