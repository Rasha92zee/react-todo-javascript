import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'

function AddToDo() {
    const [newToDo, setNewToDo] = useState('')
  return (
    <div>
        <FormControl>
            <InputLabel htmlFor='todo-text' >New To Do </InputLabel>
            <Input type="text" id="todo-text" className='todo' value = {newToDo} />
        </FormControl>
        <Button variant='contained' color='secondary' type='submit' className='save-btn' >Add ToDo</Button>
    </div>
  )
}

export default AddToDo