import ToDoApp from "./component/ToDoApp.react.js"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCJ2hT7rTjP_tizehWSNqWqLK4anzZy9M",
  authDomain: "todo-list-app-27bb6.firebaseapp.com",
  projectId: "todo-list-app-27bb6",
  storageBucket: "todo-list-app-27bb6.appspot.com",
  messagingSenderId: "853535092900",
  appId: "1:853535092900:web:0dcf4a96e711ee27c4b631",
  measurementId: "G-81BQ7HSMJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default ToDoApp;