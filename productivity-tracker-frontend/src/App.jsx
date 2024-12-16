import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProductivityTracker from './components/pages/Tasklist';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import FocusTimer from './components/pages/FocusTimer';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  const addTrackedTask = (task) => {
    console.log('Task tracked:', task);
  };

  return (
    <AuthProvider>
    <Router>
      <div>     
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/productivity" 
            element={
              <ProtectedRoute>
                <ProductivityTracker />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />      
          <Route path="/focus-timer" element={<FocusTimer addTrackedTask={addTrackedTask} />} />       
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;