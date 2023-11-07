import './App.css';
import { useEffect, useState } from 'react';
import AddToDo from "./components/AddToDo";
import { Snackbar, Typography } from '@material-ui/core';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { query, collection, doc, getDocs, addDoc, deleteDoc, serverTimestamp, docRef, updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import loading from "./loading.gif";
import UpdateToDo from './components/UpdateToDo';

const collectionName = "todo_list";
const collectionRef = collection(db, collectionName)


function App() {
  const [todos, setTodos] = useState([]); //list of todo's
  const [sbOpen, setSbOpen] = useState(false);   //show or hide snackbar.
  const [isLoading, setIsLoading] = useState(true);  //to show loader at the time of loading.
  const [isEditEnabled, setIsEditEnabled] = useState(false); //to show edit screen.
  const [currentToDo, setCurrentToDo] = useState("");  //todo for update.
  function handleSbClose() {
    setSbOpen(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  function deleteToDo(id) {
    const docRef = doc(db, collectionName, id)
    deleteDoc(docRef)
    fetchData()
  }

  // show edit screen 
  function handleEdit(editToDo) {
    setIsEditEnabled(true)
    setCurrentToDo(editToDo)
  }

  //close update/edit screen
  function cancelUpdate() {
    setIsEditEnabled(false)
  }

  // update todo
  function handleUpdate(uToDo) {
    if (uToDo === "") {
      setSbOpen(true)
      return
    }
    const docRef = doc(db, collectionName, currentToDo.id)
    updateDoc(docRef, { title: uToDo })
    fetchData()
    setSbOpen(false)
  }

  return (
    <div className='app'>
      <Typography variant='h4' >TO DO LIST</Typography> <hr />

      {isEditEnabled ? (
        <UpdateToDo
          data={currentToDo}
          onCancel={cancelUpdate}
          onUpdate={handleUpdate}
        />
      ) : (
        <div className='add-todo'>
          <AddToDo onAddToDo={addToDo} />

          {isLoading && <img src={loading} alt="loading.." />}
          {!isLoading && <TodoList todos={todos} onDelete={deleteToDo} onEdit={handleEdit} />}
        </div>
      )}

      <Footer />
      <Snackbar open={sbOpen} autoHideDuration={2000} onClose={handleSbClose}
        message="Please Enter A Task : " anchorOrigin={{ vertical: "top", horizontal: "right" }} />

    </div>
  )
}

export default App;
