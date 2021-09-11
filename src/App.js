import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

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

  let displayText = item
  if(isDone){
    displayText = item + ' finished'
  }

  return (
    <div>
      <li onClick={handleClick}>{displayText}</li>
      <button onClick={handleBtnClick}>Delete</button>
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
      <input onChange={handleChange} value={name}/>
      <button onClick={handleClick}>Submit</button>
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
    <div>
      <ToDoList toDoList={toDoList} deleteList={deleteList}/>
      <Input addList={addList}/>
    </div>
  )
}

export default ToDoApp;
