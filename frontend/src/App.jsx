import { useEffect, useState } from 'react';
import './App.css';

function App() {  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch("http://localhost:3500/liste_abrufen")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const addTask = () => {
    fetch("http://localhost:3500/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask }),
    })
    .then(response => response.json())
    .then(task => {
      setTasks([...tasks, task]);
    });

    setNewTask('');
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3500/delete/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  const updateTask = (id, completed) => {
    fetch(`http://localhost:3500/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
    .then(() => {
      setTasks(tasks.map(task => task.id === id ? { ...task, completed } : task));
    });
  };

  return (
    <>
      <h1>To-Do-List</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Neue Aufgabe hinzufügen"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(({ id, title, completed }) => (
          <li key={id}>
            <input
              type='checkbox'
              checked={completed}
              onChange={(e) => updateTask(id, e.target.checked)}
            /> {title}
            <button onClick={() => deleteTask(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
