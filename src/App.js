import ToDoApp from "./component/ToDoApp.react.js"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore";
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
const db = getFirestore(app);
/* const foo = async () => {
  try {
  
    addDoc(collection(db, "users"), {
    first: "Jo",
    middle: "Mathison",
    last: "Turing",
    born: 1912
    });
    const q = query(collection(db, "users"), where("middle", "==", "Mathison"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

foo();
*/

export default ToDoApp;