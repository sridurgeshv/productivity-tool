import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
          status: 'pending'
        })
      });

      if (response.ok) {
        const result = await response.json();
        onTaskCreated(result);
        // Reset form
        setTitle('');
        setDescription('');
        setDeadline('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
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

// Task List Component
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.map((task, index) => (
          <div key={index} className="border-b py-2">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            {task.deadline && <p>Deadline: {task.deadline}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Main App Component
const ProductivityTracker = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Productivity Tracker</h1>
      <CreateTask onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default ProductivityTracker;