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
import { useNavigate } from 'react-router-dom'
import { initializeApp } from 'firebase/app'

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      navigate('/productivity')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="login-container">
        <h2>Login</h2>    
        <button onClick={handleGoogleSignIn} >
          <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />                
          Sign in with Google
        </button>
        {error && <p className="text-red-500">{error}</p>}
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
      <button>
         <Link to="/login" className="text-white-500 ">Login</Link>
      </button>
    </nav>
  </div>
)

export default App;