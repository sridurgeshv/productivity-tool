import React from 'react';
import { Home, Grid, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Left side - Title */}
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gray-600">TaskMaster</h1>
      </div>
      
      {/* Right side - Navigation Links and Profile */}
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <a 
            href="/dashboard" 
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          
          <a 
            href="/productivity" 
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Grid size={20} />
            <span>My Tasks</span>
          </a>
        </div>
        
        {/* Profile Picture */}
        <div className="ml-4">
          <img 
            src="/api/placeholder/50/50" 
            alt="Profile" 
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;