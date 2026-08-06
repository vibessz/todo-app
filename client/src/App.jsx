import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  return (
    <div>
      <h1>My Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text} 
          
          <button onClick={(e) => (

            fetch(`http://localhost:3000/tasks/${task.id}`, {
              method: 'DELETE',
            } ).then((res) => res.json()).then((data) => setTasks(data))


          )}>Del</button>
          
          
          
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


        <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>

        <button type='submit'>Add</button>

      </form>
      
    </div>
  )
}

export default App