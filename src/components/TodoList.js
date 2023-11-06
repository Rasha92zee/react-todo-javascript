import { ListItem, List } from '@material-ui/core'
import React from 'react'

function TodoList(props) {
  const todos = props.todos
  return (
    todos.map(todo => 
      <List className="list" >
        <ListItem className='list-item' key = {todo.id} >{todo.item.title}</ListItem>
      </List>)
  )
}

export default TodoList