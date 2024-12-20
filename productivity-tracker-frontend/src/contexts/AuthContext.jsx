import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth State Changed:', currentUser);
      
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        
        try {
          await axios.post('http://localhost:3000/api/save-user', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error saving user data:', error.response ? error.response.data : error.message);
          // Fallback to setting user data even if backend save fails
          setUser(userData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUser = async (updatedData) => {
    try {
      await updateProfile(auth.currentUser, updatedData);
      
      const response = await axios.post('http://localhost:3000/api/update-user', {
        uid: user.uid,
        ...updatedData
      });
      
      if (response.data.message === 'User updated successfully') {
        setUser(prevUser => ({ ...prevUser, ...updatedData }));
        return true;
      }
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const value = {
    user,
    signInWithGoogle,
    setUser,
    logout,
    updateUser,
    loading // Expose loading state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
