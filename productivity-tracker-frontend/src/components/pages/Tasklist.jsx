import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import '../globals/Tasklist.css';

// Task Creation Component
const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
          status: 'pending'
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      onTaskCreated(result);
      // Reset form
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (error) {
      console.error('Detailed Error creating task:', error);
      // Optional: Add user-friendly error handling
      alert(`Failed to create task: ${error.message}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
          <Textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <Input 
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline"
          />
          <Button type="submit">Create Task</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const TaskList = ({ tasks, onRefresh }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const toggleTaskDetails = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onRefresh();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/tasks/${editTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTask),
      });

      if (response.ok) {
        onRefresh();
        setEditTask(null);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Task List</CardTitle>
          <Button onClick={onRefresh}>Refresh</Button>
        </div>
      </CardHeader>
      <CardContent>
        {tasks.map((task) => (
          <div key={task.id} className="border-b py-2">
            <h3 className="font-bold cursor-pointer" onClick={() => toggleTaskDetails(task.id)}>
              {task.title}
            </h3>
            {expandedTaskId === task.id && (
              <div>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                {task.deadline && <p>Deadline: {formatDate(task.deadline)}</p>}
                <Button onClick={() => handleEdit(task)}>Edit</Button>
                <Button onClick={() => handleDelete(task.id)}>Delete</Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>

      {editTask && (
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input 
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                placeholder="Task Title"
                required
              />
              <Textarea 
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                placeholder="Task Description"
              />
              <Input 
                type="date"
                value={editTask.deadline}
                onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
                placeholder="Deadline"
              />
              <Button type="submit">Update Task</Button>
              <Button onClick={() => setEditTask(null)}>Cancel</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </Card>
  );
};

// Main App Component
const ProductivityTracker = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Productivity Tracker</h1>
      <CreateTask onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} onRefresh={fetchTasks} />
    </div>
  );
};

export default ProductivityTracker;