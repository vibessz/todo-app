import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTask, setEditingTask] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  function editSave(e, task){
    fetch(`http://localhost:3000/tasks/${task.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({text: editingTask})
                                })
                                .then((res) => res.json())
                                .then((data) => setTasks(data))
                                .then(() => setEditingTask("")).then(() => setEditingId(null))
                                
  }

  function getDate(){
  
    return new Date().getDate()
  }

  function getDay(){
  
    return new Date().getDay()
  }

  return (

    <div className='page'>
    <div className='sideBar'>
      
    </div>
    <div className='container'>
      
      <div className='topLabel'>
        
        <h1>{getDay()}</h1>
        <h2>{getDate()}</h2>
      </div>
      
      <ul className='todo-list'>
        {tasks.map((task) => (
          <li className='todo-item' key={task.id} onClick={() => {setEditingId(task.id); setEditingTask(task.text); console.log(task.id);}}>
            
            
            {task.id === editingId ? 
            (
                

              <form className='editForm' onSubmit={
                                (e) => {e.preventDefault()
                                editSave(e, task)}
                              }>
            
            <input className='editBar' autoFocus type='text' value={editingTask} onBlur={(e) => editSave(e, task)} onChange={(e) => setEditingTask(e.target.value)}></input>
            </form>
            ) 
              
              : (task.text)}

          <button className='deleteButtons' onClick={(e) => {
            
            e.stopPropagation()
            fetch(`http://localhost:3000/tasks/${task.id}`, {
              method: 'DELETE',
            } ).then((res) => res.json()).then((data) => setTasks(data))


          }}>×</button>

          </li>         
        ))}
      </ul>
      <form onSubmit={
        (e) => {e.preventDefault()
        fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({text: newTask})
        })
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .then(() => setNewTask(""))
        }
      }>
        <div className='submitBar'>
        <button id='submit' type='submit'>+</button>
        <input className='addTaskBar' placeholder='Add task' type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
        </div>
        

      </form>
      
    </div>
    </div>
  )
}

export default App