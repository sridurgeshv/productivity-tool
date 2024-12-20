import React, { useState } from 'react';
import { Home, Grid } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../globals/Navbar.css';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) {
    return (
      <nav className="navbar">
        <div className="navbar-title">
          <h1>TaskMaster</h1>
        </div>
        <div className="navbar-menu">Loading...</div>
      </nav>
    );
  }

  const handleSignOut = async () => {
    try {
      await logout();
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>TaskMaster</h1>
      </div>
      
      <div className="navbar-menu">
        <div className="navbar-links">
          <a href="/dashboard" className="navbar-link">
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <a href="/productivity" className="navbar-link">
            <Grid size={20} />
            <span>My Tasks</span>
          </a>
        </div>
        
        <div className="navbar-profile">
          <div className="profile-container">
            <button 
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="profile-image"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img 
                  src="/api/placeholder/50/50" 
                  alt="Profile" 
                  className="profile-image"
                />
              )}
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <button 
                  onClick={handleSignOut} 
                  className="dropdown-item"
                  type="button"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;