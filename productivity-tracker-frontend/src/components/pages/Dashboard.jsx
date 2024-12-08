import React, { useState, useEffect } from 'react';
import '../globals/Dashboard.css';
import Calendar from './Calendar';
import Pomodoro from './Pomodoro';
import Links from '../pages/Links';
import Navbar from './Navbar';
import Taskslist from './Taskslist';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showPomodoro, setShowPomodoro] = useState(false);
    const [trackedTasks, setTrackedTasks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5173/tracked-tasks')
          .then(response => response.json())
          .then(data => setTrackedTasks(data))
          .catch(error => console.error('Error fetching tracked tasks:', error));
      }, []);
    
      const addTrackedTask = (task) => {
        setTrackedTasks(prevTrackedTasks => [...prevTrackedTasks, task]);
      };

      return (
        <div className="dashboard">
          <div className="dashboard-header">   
           <Navbar />  
          </div>
          <div className="header-buttons">              
              <Pomodoro addTrackedTask={addTrackedTask} />
            </div>
          <div className="main-content">
            <div className="left-column">
              <Calendar />
              <Links />
            </div>
            <div className="middle-column">
              {/* <TaskList tasks={tasks} setTasks={setTasks} /> */} 
              <div className="text-area">
                <h2>Hello! How are you doing today?</h2>
              </div>
              <Taskslist />
            </div>
            <div className="right-column">
              
            </div>
          </div>
          {showPomodoro && (
            <Pomodoro onClose={togglePomodoro} addTrackedTask={addTrackedTask} />
          )}
        </div>
      );
    }
    
    export default Dashboard;