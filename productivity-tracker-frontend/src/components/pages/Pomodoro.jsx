import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import focusIcon from "../../assets/focus.png";
import "../globals/Pomodoro.css";

const Pomodoro = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const navigate = useNavigate();

  const togglePomodoro = () => setIsOpen(!isOpen);

  const startFocusing = () => {
    if (taskTitle.trim()) {
      navigate("/focus-timer", { state: { title: taskTitle } });
    } else {
      alert("Enter a task title!");
    }
  };

  return (
    <div className="pomodoro-container">
      <button className="pomodoro-button" onClick={togglePomodoro}>
        <img src={focusIcon} alt="Focus Mode" className="focus-icon" />
        Pomodoro
      </button>
      {isOpen && (
        <div className="pomodoro-popup">
          <div className="popup-header">
            <span>🧠 Focus Mode</span>
            <button onClick={() => setIsOpen(false)} className="close-button">×</button>
          </div>
          <div className="popup-content">
            <div className="option">
              <span>Task Title</span>
              <input
                type="text"
                placeholder="Specify the task you will focus on"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <button className="start-focus-button" onClick={startFocusing}>
              Start Focusing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
