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
/*const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); */

/*

const ToDoItem = (props) => {
  const item = props.item
  const deleteList = props.deleteList
  const updateList = props.updateList

  const handleClick = (e) => {
    updateList(item)
  };

  const handleBtnClick = (e) => {
    deleteList(item);
  };

  return(
    <div>
      <FormControlLabel control={<Checkbox onClick={handleClick} checked={item.isDone}/>} label={item.toDoItem}/>
      <p>{item.timeStamp}</p>
      <p>{item.currentUser}</p>
      <Button onClick={handleBtnClick}>Delete</Button>
    </div>
  );
};

const ToDoList = (props) => {
  const toDoList = props.toDoList;
  const toDoListComponent = toDoList.map(item => {
    return <ToDoItem key={item.id} deleteList={props.deleteList} updateList={props.updateList} item={item} />
  });

  return(
    <ol>
      {toDoListComponent}
    </ol>
  );
};

const Input = (props) => {
  const [name, setName] = useState("");
  const addList = props.addList;

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleBtnClick = (e) => {
    addList(name);
    setName("");
  };

  return(
    <div>
      <TextField onChange={handleChange} value={name}/>
      <Button onClick={handleBtnClick}>Submit</Button>
    </div>
  )
};

const ToDoApp = () => {
  const [toDoList, setToDoList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isToggleOn, setIsToggleOn] = useState(false);

  useEffect(async() => {
    const arr = [];
    const q = query(collection(db ,"ToDoList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(document => {
      arr.push({
        toDoItem: document.data().toDoItem,
        isDone: document.data().isDone,
        id: document.id,
        timeStamp: document.data().timeStamp,
        currentUser: document.data().currentUser
      });
    });

    arr.sort((a, b) => {return a.timeStamp - b.timeStamp});
    setToDoList(arr);

  }, []);

  const addList = async(newItem) => {
    const timeStamp = Date.now();

    const item = await addDoc(collection(db, "ToDoList"), {
      toDoItem: newItem,
      isDone: false,
      timeStamp: timeStamp,
      currentUser: currentUser
    });

    setToDoList([...toDoList, {
      toDoItem: newItem,
      isDone: false,
      timeStamp: timeStamp,
      id: item.id,
      currentUser: currentUser
    }]);
  };

  const updateList = (item) => {
    const newList = toDoList.map(changedItem => {
      if(changedItem.id === item.id){
        return {
          toDoItem: changedItem.toDoItem,
          isDone: !changedItem.isDone,
          timeStamp: changedItem.timeStamp,
          id: changedItem.id,
          currentUser: changedItem.currentUser
        };
      };
      return changedItem
    });
    setToDoList(newList);

    let isDone = item.isDone;

    if(isDone){
      setDoc(doc(db, "ToDoList", item.id), {
        isDone: false
      }, {merge:true});
    }else{
      setDoc(doc(db, "ToDoList", item.id), {
        isDone: true
      }, {merge:true});
    }
  };

  const deleteList = async(del) => {
    const newList = toDoList.filter(item => {
      return item.id !== del.id;
    });
    setToDoList(newList);

    deleteDoc(doc(db, "ToDoList", del.id))
  };

   const handleClick = (e) => {
    signOut(auth).then(() => {

    }).catch((error) => {
    
    });
  };
  
  const handleBtnClick = (e) => {
    setIsToggleOn(!isToggleOn);
  };

  let logInUi = (
    <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );

  if(auth.currentUser){
    logInUi = (
      <div>
        <p>{currentUser}</p>
        <Button onClick={handleClick}>Logout</Button>
      </div>
    );
  };
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(auth.currentUser.uid)
      const uid = user.uid;
      
    } else {
      setCurrentUser(null);
      ui.start('#firebaseui-auth-container', uiConfig); 
    }
  });

  let toggle = "";
  if(isToggleOn){
    toggle = "Show All Items"
  }else{
    toggle = "Show Only My Items"
  }

  let newList = toDoList;
  if(isToggleOn){
    newList = toDoList.filter(document => {
      return document.currentUser === currentUser
    });
  }else{
    newList = toDoList;
  }
  
  return(
    <div>
      <h1>Welcome to My Awesome App</h1>
      {logInUi}
      <Button onClick={handleBtnClick}>{toggle}</Button>
      <ToDoList toDoList={newList} updateList={updateList} deleteList={deleteList}/>
      <Input addList={addList}/>
      
    </div>
  )

};

export default ToDoApp;

*/




export default ToDoApp;