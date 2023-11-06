import './App.css';
import { useEffect, useState } from 'react';
import AddToDo from "./components/AddToDo";
import { Snackbar, Typography } from '@material-ui/core';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { query, collection, doc, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import loading from "./loading.gif";

const collectionName = "todo_list";
const collectionRef = collection(db, collectionName)


function App() {
  const [todos, setTodos] = useState([]); //list of todo's
  const [sbOpen, setSbOpen] = useState(false);   //show or hide snackbar
  const [isLoading, setIsLoading] = useState(true);  //to show loader at the time of loading.

  function handleSbClose() {
    setSbOpen(false)
  }

  useEffect(()=>{
    fetchData()
  }, [] )

  async function fetchData() {
    setTodos([]);
    const queryStatement = query(collectionRef);
    const querySnapshots = await getDocs(queryStatement);
    const data = [];
    querySnapshots.forEach((doc) => {
      data.push({ item: doc.data(), id: doc.id, ref: doc.ref });
    });
    setTodos(data);
    setIsLoading(false);
    // console.log(data);
    // console.log(todos);
  }

  function addToDo(newToDo) {
    if (newToDo === "") {
      setSbOpen(true)
    return
    }
  

  async function post() {
    await addDoc(collection(db, collectionName), {
      title: newToDo,
      createdAt: serverTimestamp()
    })
    fetchData()
  }
  post()
}

return (
  <div className='app'>
    <Typography variant='h4' >TO DO LIST</Typography>
    <div className='add-todo'>
      <AddToDo onAddToDo={addToDo} />
    </div>
    { isLoading && <img src={loading} alt="loading.." /> }
    { !isLoading && <TodoList todos={todos} /> }  

    <Footer />
    <Snackbar open={sbOpen} autoHideDuration={2000} onClose={handleSbClose}
      message="Please Enter A Task : " anchorOrigin={{ vertical: "top", horizontal: "right" }} />

  </div>
)
}

export default App;
