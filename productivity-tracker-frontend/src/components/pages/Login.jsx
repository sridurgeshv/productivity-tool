import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '../ui/button';
import '../globals/Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>    
        <Button className="google-auth-btn" onClick={handleGoogleSignIn}>
          <img 
            className="google-icon"
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" 
            alt="Google" 
          />                
          Sign in with Google
        </Button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;