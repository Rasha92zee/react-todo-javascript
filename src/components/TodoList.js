import { ListItem, List } from '@material-ui/core'
import React from 'react'
import { DeleteForever, Edit } from '@material-ui/icons'
import "./ToDoList.css";

function TodoList(props) {
  const todos = props.todos
  return (
    todos.map(todo => 
      <List className="list" >
        <ListItem className='list-item' key = {todo.id} >{todo.item.title}</ListItem>
        <DeleteForever onClick = {() => {props.onDelete(todo.id)}} />
        <Edit onClick = {() => {props.onEdit(todo)}} />
      </List>)
  )
}

export default TodoList