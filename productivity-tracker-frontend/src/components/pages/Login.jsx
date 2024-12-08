import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '../ui/button';

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
    <div className="min-h-screen">
      <div className="login-container">
        <h2>Login</h2>    
        <Button onClick={handleGoogleSignIn}>
          <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />                
          Sign in with Google
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;