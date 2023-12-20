
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCImZUxNL7W3f2Q90MYy4VWFr1Cxr99uqM",
  authDomain: "react-netflix-clone-263a3.firebaseapp.com",
  projectId: "react-netflix-clone-263a3",
  storageBucket: "react-netflix-clone-263a3.appspot.com",
  messagingSenderId: "731152494123",
  appId: "1:731152494123:web:540f5b18403249edfec46e",
  measurementId: "G-ZHJR2L7XLY"
};

const app = initializeApp(firebaseConfig);

 const firebaseAuth = getAuth(app);
 export default firebaseAuth;