import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../globals/FocusTimer.css";
import BinauralBeats from "./BinauralBeats"; // Import BinauralBeats component

const FocusTimerPage = () => {
  const location = useLocation();
  const { title } = location.state || { title: "Default Task" };

  // Timer states
  const [seconds, setSeconds] = useState(25 * 60); // Default Pomodoro time
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState("Pomodoro"); // Modes: Pomodoro, Short Break
  const [trackedTasks, setTrackedTasks] = useState([]);
  const [activeAudio, setActiveAudio] = useState(null);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  // Switch Mode Logic
  const switchMode = (newMode) => {
    setMode(newMode);
    if (newMode === "Pomodoro") {
      setSeconds(25 * 60);
    } else if (newMode === "Short Break") {
      setSeconds(5 * 60); // Set Short Break time to 5 minutes
    }
    setIsRunning(true);
  };

  const stopFocusSession = () => {
    if (mode === "Pomodoro") { // Only track tasks in Pomodoro mode
      const timeSpent = 25 * 60 - seconds;
  
      fetch("http://localhost:3000/tracked-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, time: timeSpent, mode }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTrackedTasks((prev) => [...prev, data]);
        })
        .catch((err) => console.error("Error:", err));
    }
  
    // Always stop the timer regardless of mode
    setIsRunning(false);
  };
  
  // Fetch tracked tasks
  useEffect(() => {
    fetch("http://localhost:3000/tracked-tasks")
      .then((res) => res.json())
      .then((data) => setTrackedTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const deleteTrackedTask = (id) => {
    fetch(`http://localhost:3000/tracked-tasks/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setTrackedTasks((prev) => prev.filter((task) => task.id !== id));
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  const handleMusicStart = (audio) => {
    if (activeAudio) {
      activeAudio.pause();
    }
    setActiveAudio(audio);
  };

  return (
    <div className="focus-timer-overlay">
      {/* Binaural Beats Section */}
      <BinauralBeats onMusicStart={handleMusicStart} />
  
      <div className="focus-timer">
        <h1>Pomodoro Timer</h1>
  
        {/* Task Title */}
        <h2>Task: {title}</h2>
  
        {/* Mode Switcher */}
        <div className="mode-switcher">
          <button
            onClick={() => switchMode("Pomodoro")}
            className={mode === "Pomodoro" ? "active" : ""}
          >
            Pomodoro
          </button>
          <button
            onClick={() => switchMode("Short Break")}
            className={mode === "Short Break" ? "active" : ""}
          >
            Short Break
          </button>
        </div>
  
        {/* Timer Section */}
        <div className="timer-display">
          <h2>{mode}</h2>
          <p>{`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`}</p>
          <div>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button onClick={stopFocusSession}>Stop</button>
          </div>
        </div>
  
        {/* Tracked Tasks - Render only in Pomodoro mode */}
        {mode === "Pomodoro" && (
          <div className="tracked-tasks">
            <h3>Tracked Tasks</h3>
            <ul>
              {trackedTasks.map((task, index) => (
                <li key={index}>
                  {task.title} - {task.mode} -{" "}
                  {Math.floor(task.time / 60)} min {task.time % 60} sec
                  <button
                    onClick={() => deleteTrackedTask(task.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );  
};

export default FocusTimerPage;