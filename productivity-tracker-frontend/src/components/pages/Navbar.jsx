import React from 'react';
import { Home, Grid } from 'lucide-react';
import '../globals/Navbar.css'

const Navbar = () => {
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
          <img 
            src="/api/placeholder/50/50" 
            alt="Profile" 
            className="profile-image"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
