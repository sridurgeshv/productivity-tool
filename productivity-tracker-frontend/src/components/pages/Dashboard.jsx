import React, { useState } from 'react';
import '../globals/Dashboard.css';
import Calendar from './Calendar';
import Pomodoro from './Pomodoro';
import Links from '../pages/Links';
import Navbar from './Navbar';
import Taskslist from './Taskslist';
import SettingsButton from './SettingsButton';

function Dashboard() {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePomodoro = () => {
    setShowPomodoro(!showPomodoro);
  };

  // Function to handle API call for suggestions
  const askAI = async () => {
    setLoading(true);
    setAnswer('');
    setError('');
    try {
      const response = await fetch(`http://localhost:3000/ai-suggestions?input=${encodeURIComponent(question)}`, {
        method: 'GET', // Ensuring it's a GET request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.suggestions) {
        setAnswer(data.suggestions); // Directly set the text suggestions
      } else {
        setAnswer('No suggestions found.');
      }
    } catch (error) {
      setError('Error fetching the answer. Please try again.');
    }
    setLoading(false);
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
        </div>
        <div className="middle-column">
          <div className="text-area">
            <h2>Hello! How are you doing today?</h2>
          </div>
          <Taskslist />

          {/* Add input and button to ask AI */}
          <div className="ask-ai-container">
            <input
              type="text"
              placeholder="Ask the AI for productivity tips..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button onClick={askAI} disabled={loading || !question.trim()}>
              {loading ? 'Loading...' : 'Ask AI'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {answer && (
              <div className="ai-answer">
                <h3>AI's Suggestions:</h3>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
        <div className="right-column">
        <Links />
        </div>
      </div>
      {showPomodoro && <Pomodoro onClose={togglePomodoro} />}
      <SettingsButton />
    </div>
  );
}

export default Dashboard;
