import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'

function AddToDo(props) {
    const [newToDo, setNewToDo] = useState('')
    
    const handleAddToDo = (event)=> {
      event.preventDefault()
      props.onAddToDo(newToDo)
      setNewToDo("")

    }

  return (
    <div>
        <FormControl>
            <InputLabel htmlFor='todo-text' >New To Do </InputLabel>
            <Input type="text" id="todo-text" className='todo' value = {newToDo} 
            onChange={event => setNewToDo(event.target.value)} />
        </FormControl>
        <Button variant='contained' color='secondary' type='submit' className='save-btn'  
        onClick={handleAddToDo}>Add ToDo</Button>
    </div>
  )
}

export default AddToDo