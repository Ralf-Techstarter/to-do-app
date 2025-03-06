import { useEffect, useState } from 'react'
import './App.css'



function App() {  
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3500/liste_abrufen")
    .then((res) => res.json())
    .then(setTasks);
  });

  return (
    <>
      <h1>To-Do-List</h1>
      <input />
      <button>Add</button>
      <ul>
        {
          tasks.map(({id, title, completed}) => {
            <li key={id}>
              <input type='checkbox'/> {title} {completed}
            </li>
          })


        }
        <li><input type="checkbox"/>PH<button>X</button></li>
      </ul>
    </>
  )
}

export default App
