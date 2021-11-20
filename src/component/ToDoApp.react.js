import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore, deleteDoc, doc, query, where, getDocs} from "firebase/firestore";

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

const ToDoItem = (props) => {
  const [isDone, setIsDone] = useState(false);
  const item = props.item;
  const deleteList = props.deleteList;
  const handleClick = (e) => {
    if (isDone){
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  };
  const handleBtnClick = (e) => {
    deleteList(item);
  };
  return (
    <div>
      <FormControlLabel control={<Checkbox onClick={handleClick} checked={isDone}/>} label={item} />
      <Button onClick={handleBtnClick} variant="text">Delete</Button>
    </div>
  );
};
  
const ToDoList = (props) => {
  const toDoList = props.toDoList;
  const toDoListComponent = toDoList.map(item => {
    return (
      <ToDoItem key={item} deleteList={props.deleteList} item={item}/>
    );
  });
  return (
    <ul>{toDoListComponent}</ul>
  );
};
  
const Input = (props) => {
  const [name, setName] = useState('');
  const addList = props.addList;
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleClick = (e) => {
    addList(name);
    setName('');
  };
  return (  
    <div>
      <TextField value={name} onChange={handleChange} id="standard-basic" variant="standard" />
      <Button onClick={handleClick} variant="contained">Submit</Button>
    </div>
  );
};
  
const ToDoApp = (props) => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(async () => {
    const q = query(collection(db, "ToDoList"));
    const querySnapshot = await getDocs(q);
    const a = []
    querySnapshot.forEach((document) => { 
      a.push(document.data().toDoItem)
    })
    
    setToDoList(a);

  }, []);

  const addList = (newItem) => {
    setToDoList([...toDoList, newItem]);
    addDoc(collection(db, "ToDoList"), {
      toDoItem: newItem
    });
  };
  const deleteList = async (del) => {
    const newList = toDoList.filter(item => {
      return item !== del;
    });
    setToDoList(newList);
    const q = query(collection(db, "ToDoList"), where("toDoItem", "==", del));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      deleteDoc(doc(db, "ToDoList", document.id));
    });
    
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box display="flex">
          <Box m="auto" sx={{height: '100vh'}}>
            <ToDoList toDoList={toDoList} deleteList={deleteList}/>
            <Input addList={addList}/>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
  
export default ToDoApp;