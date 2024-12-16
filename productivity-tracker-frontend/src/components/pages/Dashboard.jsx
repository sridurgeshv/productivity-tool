import React, { useState, useEffect } from 'react';
import '../globals/Dashboard.css';
import Calendar from './Calendar';
import Pomodoro from './Pomodoro';
import Links from '../pages/Links';
import Navbar from './Navbar';
import Taskslist from './Taskslist';
import SettingsButton from './SettingsButton';

function Dashboard() {
  const [showPomodoro, setShowPomodoro] = useState(false);

    const togglePomodoro = () => {
      setShowPomodoro(!showPomodoro);
    };

      return (
        <div className="dashboard">
          <div className="dashboard-header">   
           <Navbar />  
          </div>
          <div className="header-buttons">              
              <Pomodoro />
            </div>
          <div className="main-content">
            <div className="left-column">
              <Calendar />
              <Links />
            </div>
            <div className="middle-column"> 
              <div className="text-area">
                <h2>Hello! How are you doing today?</h2>
              </div>
              <Taskslist />
            </div>
            <div className="right-column">
            </div>
          </div>
          {showPomodoro && (
            <Pomodoro onClose={togglePomodoro} />
          )}
          <SettingsButton />
        </div>
      );
    }
    
    export default Dashboard;