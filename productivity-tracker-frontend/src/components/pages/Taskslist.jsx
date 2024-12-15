// update the whole file everything is changed
import React, { useState, useEffect } from 'react';
import '../globals/Taskslist.css';

function Taskslist() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]); // Fallback to empty array if the fetch fails
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/complete/${id}`, { method: 'POST' });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: 'completed' } : task
      ));
    } catch (error) {
      console.error(`Failed to mark task ${id} as complete`, error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="tasks card">
      <h3>My tasks ({tasks.length})</h3>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.status === 'completed' ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => handleComplete(task.id)}
            />
            {task.title}
            <span className="task-date">{formatDate(task.deadline)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Taskslist;