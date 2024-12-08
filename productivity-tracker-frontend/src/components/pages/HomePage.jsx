import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Welcome Home, Users</h1>
    <p>Are you overwhelmed by juggling multiple tasks and searching for a powerful productivity tool? Look no further! Click the above button to discover our cutting-edge Productivity Tracker, designed to streamline your workflow and elevate your efficiency to new heights.</p>
    <nav>
      <button>
         <Link to="/login" className="text-white-500">Login</Link>
      </button>
    </nav>
  </div>
);

export default HomePage;