import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const ToDoItem = (props) => {
    const [isDone, setIsDone] = useState(false)
    const item = props.item
    const deleteList = props.deleteList
    const handleClick = (e) => {
      if (isDone){
        setIsDone(false)
      } else {
        setIsDone(true)
      }
    }
    const handleBtnClick = (e) => {
      deleteList(item)
    }
  

  
    return (
      <div>
        <FormControlLabel control={<Checkbox onClick={handleClick} checked={isDone}/>} label={item} />
        <Button onClick={handleBtnClick} variant="text">Delete</Button>

      </div>
    )
  }
  
  const ToDoList = (props) => {
    const toDoList = props.toDoList
    const toDoListComponent = toDoList.map(item => {
      return (
        <ToDoItem key={item} deleteList={props.deleteList} item={item}/>
      )
    })
    return (
      <ul>{toDoListComponent}</ul>
    )
  }
  
  const Input = (props) => {
    const [name, setName] = useState('')
    const addList = props.addList
    const handleChange = (e) => {
      setName(e.target.value)
    }
    const handleClick = (e) => {
      addList(name)
      setName('')
    }
    return (  
      <div>
        <TextField value={name} onChange={handleChange}id="standard-basic" variant="standard" />
        <Button onClick={handleClick} variant="contained">Submit</Button>
      </div>
      
    )
  }
  
  const ToDoApp = (props) => {
    const [toDoList, setToDoList] = useState([])
    const addList = (newItem) => {
      setToDoList([...toDoList, newItem])
    }
    const deleteList = (del) => {
      const newList = toDoList.filter(item => {
        return item !== del
      })
      setToDoList(newList)
    }
  
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
    )
  }
  
  export default ToDoApp;