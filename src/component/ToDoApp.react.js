import * as React from 'react';
import {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { addDoc, collection, getFirestore, deleteDoc, doc, query, getDocs, getDoc, setDoc} from "firebase/firestore";
import * as firebaseui from "firebaseui";
import { getAuth, EmailAuthProvider, signOut, onAuthStateChanged} from "firebase/auth";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const firebaseConfig = {
  apiKey: "AIzaSyCCJ2hT7rTjP_tizehWSNqWqLK4anzZy9M",
  authDomain: "todo-list-app-27bb6.firebaseapp.com",
  projectId: "todo-list-app-27bb6",
  storageBucket: "todo-list-app-27bb6.appspot.com",
  messagingSenderId: "853535092900",
  appId: "1:853535092900:web:0dcf4a96e711ee27c4b631",
  measurementId: "G-81BQ7HSMJK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      console.log('success', authResult, redirectUrl);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      if (document.getElementById('loader') != null) {
        document.getElementById('loader').style.display = 'none';
      }
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
  
    EmailAuthProvider.PROVIDER_ID
    
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

const ui = new firebaseui.auth.AuthUI(auth);
ui.start('#firebaseui-auth-container', uiConfig);

// 아래부터 암기

const ToDoItem = (props) => {
  const item = props.item;
  const updateList = props.updateList;
  const deleteList = props.deleteList;

  const handleClick = (e) => {
    updateList(item);
  };

  const handleBtnClick = (e) => {
    deleteList(item);
  };

  return (
    <div>
      <FormControlLabel control={<Checkbox onClick={handleClick} checked={item.isDone}/>} label={item.toDoItem}/>
      <p>{item.timeStamp}</p>
      <Button onClick={handleBtnClick}>Delete</Button>

    </div>
  );
};

const ToDoList = (props) => {
  const toDoList = props.toDoList
  const toDoListComponent = toDoList.map(item => {
    return <ToDoItem key={item.id} deleteList={props.deleteList} updateList={props.updateList} item={item}/>
  });

  return (
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

  const handleClick = (e) => {
    addList(name);
    setName("");
  };

  return (
    <div>
      <TextField onChange={handleChange} value={name}/>
      <Button onClick={handleClick}>Submit</Button>
    </div>
  );
};

const ToDoApp = () => {
  const [toDoList, setToDoList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [currentPage, setCurrentPage] = useState("main");
  const [userList, setUserList] = useState([]);
  const [userNickname, setUserNickName] = useState(null)

  useEffect(async() => {
    const arr = [];
    const q = query(collection(db, "ToDoList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(document => {
      arr.push({
        toDoItem: document.data().toDoItem,
        isDone: document.data().isDone,
        id: document.id,
        timeStamp: document.data().timeStamp,
        addedBy: currentUser
      });
    });

    arr.sort((a, b) => {return a.timeStamp - b.timeStamp});
    setToDoList(arr);

  }, []);

  useEffect(() => {
    if(currentPage === "login"){
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }, [currentPage]);

  useEffect(async() => {
    if(currentUser !== null && currentUser !== undefined){
      console.log(currentUser)
      const docRef = doc(db, "UserList", currentUser);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserNickName(docSnap.data().userNickname);
      } else {
        console.log("No such document!");
      }
    }
  }, [currentUser]);
  
  const addList = async(newItem) => {
    const timeStamp = Date.now();

    const item = await addDoc(collection(db, "ToDoList"), {
      toDoItem: newItem,
      isDone: false,
      timeStamp: timeStamp,
      addedBy: currentUser
    });

    setToDoList([...toDoList, {
      toDoItem: newItem,
      isDone: false,
      id: item.id,
      timeStamp: timeStamp,
      addedBy: currentUser
    }]);
  };

  const updateList = (item) => {
    const newList = toDoList.map(changedItem => {
      if(item.id === changedItem.id){
        return {
          toDoItem: changedItem.toDoItem,
          isDone: !changedItem.isDone,
          id: changedItem.id,
          timeStamp: changedItem.timeStamp,
          addedBy: changedItem.currentUser
        };
      };
      return changedItem;
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

  const deleteList = (del) => {
    const newList = toDoList.filter(item => {
      return item.id !== del.id
    });
    setToDoList(newList);

    deleteDoc(doc(db, "ToDoList", del.id));
  };

  const handleBtnClick = (e) => {
    setIsToggleOn(!isToggleOn);
  };

  const handleLoginBtnClick = (e) => {
    setCurrentPage("login");
  }

  const handleLogOutBtnClick = (e) => {
    signOut(auth).then(() => {

    }).catch(err => {

    });
    

    setCurrentPage("main")
  };

  const handleMainIconClick = (e) => {
    setCurrentPage("main")
  }

  /*
  const getUsers = () => {
    const arr = [];
    const q = query(collection(db, "UserList"));
    const querySnapshot = await getDocs(q);
    const i = querySnapshot.length()
    const index = 0
    querySnapshot.forEach(document => {
      arr.push(document.data)
    })
  } 
  */
 
  onAuthStateChanged(auth, (user) => {
    if(user){
      setCurrentUser(auth.currentUser.uid);
    } else {
      setCurrentUser(null);
    }
  });


  let toggle = "";
  let newList = toDoList;
  if(isToggleOn){
    toggle = "Show All Items"
    newList = toDoList.filter(item => {
      return item.currentUser === currentUser;
    });
  } else{
    toggle = "Show Only My Items"
    newList = toDoList;
  }
  
  const [A, setA] = useState();

  const currentUserNickName = userNickname

  const changeUserNickName = async(e) => {
    setUserNickName(A);
    setA("");

    const user = await setDoc(doc(db, "UserList", currentUser), {
      currentUser: currentUser,
      userNickname: A
    });

  };

  const handleNickNameChange = (e) => {
    setA(e.target.value);
  };

  // main page
  let main = (
    <div>

      <h1>Welcome to My Awsome App</h1>
      <p>Current User: {currentUserNickName}</p>
      <TextField onChange={handleNickNameChange} value={A}/>
      <Button onClick={changeUserNickName}>Change NickName</Button>



      <div>
        <Button onClick={handleBtnClick}>{toggle}</Button>
      <ToDoList toDoList={newList} deleteList={deleteList} updateList={updateList} />
      <Input addList={addList} />
      </div>
      
    </div>
  );

  let loginScreen = (
    <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );  

  let toggleAuthButton = null
  
  if(currentUser !== null){
    toggleAuthButton = (
      <Button color="inherit" onClick={handleLogOutBtnClick}>LogOut</Button>
    );
  }else{
    toggleAuthButton = (
      <Button color="inherit" onClick={handleLoginBtnClick}>Login</Button>
    );
  }
  
  
  // change screen
  let controlPage = main 
  if(currentPage === "login"){
    controlPage = loginScreen;
  }

  const mainIcon = (
    <h1 onClick={handleMainIconClick}>ToDoApp</h1>
  )

  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {mainIcon}
            </Typography>
            {/* <Button color="inherit"></Button> */}
            {toggleAuthButton}
          </Toolbar>
        </AppBar>
      </Box>

      {controlPage}
    </div>
  )

};

export default ToDoApp;
