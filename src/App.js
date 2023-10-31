import './App.css';
import { useState } from 'react';
import AddToDo from './components/AddToDo';
import { Typography } from '@material-ui/core';


function App() {
  const [todo, setToDo] = useState([]); //list of todo's
  return (
    <div className='app'>
      <Typography variant='h4' >TO DO LIST</Typography>
      <div className='add-todo'>
        <AddToDo/>
      </div>

    </div>
  )
}

export default App;
