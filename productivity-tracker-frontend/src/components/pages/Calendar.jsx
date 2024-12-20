import React, { useState, useEffect } from 'react';
import '../globals/Calendar.css';


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState({ day: null, month: null, year: null });
  const [displayedDate, setDisplayedDate] = useState({ month: null, year: null });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCurrentDate = async () => {
      try {
        const response = await fetch('http://localhost:3000/current-date');
        const data = await response.json();
        setCurrentDate(data);
        setDisplayedDate({ month: data.month, year: data.year });
      } catch (error) {
        console.error('Error fetching date:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchCurrentDate();
    fetchTasks();
  }, []);

  const daysInMonth = new Date(displayedDate.year, displayedDate.month, 0).getDate();
  const firstDayOfMonth = new Date(displayedDate.year, displayedDate.month - 1, 1).getDay();

  const handlePrevMonth = () => {
    let newMonth = displayedDate.month - 1;
    let newYear = displayedDate.year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    setDisplayedDate({ month: newMonth, year: newYear });
  };

  const handleNextMonth = () => {
    let newMonth = displayedDate.month + 1;
    let newYear = displayedDate.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setDisplayedDate({ month: newMonth, year: newYear });
  };

  const getMonthName = (month) => new Date(0, month - 1).toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar card">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>‹</button>
        <h3>{getMonthName(displayedDate.month)} {displayedDate.year}</h3>
        <button onClick={handleNextMonth}>›</button>
      </div>
      <div className="weekdays">
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
        <div>Su</div>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="empty"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={
              day === currentDate.day && displayedDate.month === currentDate.month && displayedDate.year === currentDate.year
                ? 'selected'
                : ''
            }
          >
            {day}
            {tasks
              .filter(task => {
                const taskDate = new Date(task.deadline);
                return (
                  taskDate.getDate() === day &&
                  taskDate.getMonth() + 1 === displayedDate.month &&
                  taskDate.getFullYear() === displayedDate.year
                );
              })
              .map(task => (
                <div
                  key={task.id}
                  className={`task ${task.status === 'completed' ? 'completed' : ''}`}
                  title={`Status: ${task.status}`}
                >
                  <span>{task.title}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

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

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Productivity Tracker Calender</h1>
      <Calendar />
    </div>
  );
};

export default ProductivityTracker;
