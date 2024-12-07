import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductivityTracker from './components/Tasklist';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/productivity">Go to Productivity Tracker</Link>
        </nav>
        
        <Routes>
          <Route path="/productivity" element={<ProductivityTracker />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to the Home Page</h1>
              <p>Click the link to go to Productivity Tracker</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;