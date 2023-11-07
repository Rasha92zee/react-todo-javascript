import React, { useState } from 'react'
import "./UpdateToDo.css";
import { Button, TextField } from '@material-ui/core';


function UpdateToDo(props) {
  const data = props.data
  const [updatedToDo, setUpdatedToDo]  = useState("")

  //pass data to parent
  function handleUpdate(){
    props.onUpdate(updatedToDo)   
  }

  return (
    <div>
      <div>
        <TextField  placeholder = {data.item.title} onChange = {(event) => {setUpdatedToDo(event.target.value)}} />
        <Button variant='contained' color='secondary' onClick={handleUpdate} >Update ToDo</Button>
        <Button variant='contained' color='primary' onClick={props.onCancel} >Cancel ToDo</Button>

      </div>
    </div>

  )
}

export default UpdateToDo
