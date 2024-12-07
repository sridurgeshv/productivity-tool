import React, { useState, useEffect } from 'react'
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import ProductivityTracker from './components/Tasklist';
import './App.css';
import { initializeApp } from 'firebase/app'

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyB_j_XUci_eH2IABQvoaOMErcR6jgIV8sU",
  authDomain: "task-master-58da4.firebaseapp.com",
  projectId: "task-master-58da4",
  // other config details
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" />
}

// Login Component
const Login = () => {
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <button 
          onClick={handleGoogleSignIn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

// Main App Component with Routing
function App() {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error', error)
    }
  }

  return (
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
        </Routes>
      </div>
    </Router>
  )
}

// Simple Home Page
const HomePage = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-4">Welcome Home, Users</h1>
    <p>Are you overwhelmed by juggling multiple tasks and searching for a powerful productivity tool? Look no further! Click the above button to discover our cutting-edge Productivity Tracker, designed to streamline your workflow and elevate your efficiency to new heights.</p>
    <nav>
    <Link to="/login" className="text-blue-500">Login</Link>
    </nav>
  </div>
)

export default App;