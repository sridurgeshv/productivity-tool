import React from 'react';
import { Home, Grid } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../globals/Navbar.css'

const Navbar = () => {
  const { user, loading } = useAuth();

  // If still loading, you can return null or a loading indicator
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

  return (
    <nav className="navbar">
      {/* Left side - Title */}
      <div className="navbar-title">
        <h1>TaskMaster</h1>
      </div>
      
      {/* Right side - Navigation Links and Profile */}
      <div className="navbar-menu">
        {/* Navigation Links */}
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
        
        {/* Profile Picture */}
        <div className="navbar-profile">
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profile-image"
            referrerPolicy="no-referrer"  // This is already correct
          />
        ) : (
          <img 
            src="/api/placeholder/50/50" 
            alt="Profile" 
            className="profile-image"
          />
        )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;