import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductivityTracker from './components/Tasklist';
import './App.css';

function App() {
  return (
    <Router>
      <div>        
        <Routes>
          <Route path="/productivity" element={<ProductivityTracker />} />
          <Route path="/" element={
            <div>
              <h1>Welcome Home, Users</h1>
              <p>Are you overwhelmed by juggling multiple tasks and searching for a powerful productivity tool? Look no further! Click the above button to discover our cutting-edge Productivity Tracker, designed to streamline your workflow and elevate your efficiency to new heights.</p>
            </div>
          } />
        </Routes>
        <nav>
          <Link to="/productivity">Let's Go</Link>
        </nav>
      </div>
    </Router>
  )
}

export default App;