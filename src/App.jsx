import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/TaskList';
import AddTask from './components/AddTask';
import { useState,useEffect } from 'react';
import  Footer  from './components/footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer);
  }
  
  getTasks()
},[])
  
//fetch Tasks from server
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  return data;
};  

//fetch task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
};  


  //Delete Task
  const DeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'DELETE',
    })
    setTasks(
      tasks.filter((task) => {
        task.id !== id;
      })
    );
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
const taskToToggle = await fetchTask(id)
const updateTask = {...taskToToggle,
reminder: !taskToToggle.reminder}

const res = await fetch(`http://localhost:5000/tasks/${id}`,{
  method : 'PUT',
  headers: {
    'content-type' : 'application/json'
  },
  body: JSON.stringify(updateTask)
})

const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  //Add Task
  const AddTasks = async (task) => {
    const response = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    const data = await response.json()
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Hello"
          onAdd={() => {
            setShowAddTask(!showAddTask);
          }}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={AddTasks} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={DeleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To show'
                )}
              </>
            }
          />
          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
