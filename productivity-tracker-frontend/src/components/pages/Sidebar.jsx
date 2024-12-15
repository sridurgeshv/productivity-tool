import React from 'react';
import { XIcon } from 'lucide-react';
import '../globals/Dashboard.css';

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Settings</h3>
        <button className="close-button" onClick={onClose}>
          <XIcon size={20} />
        </button>
      </div>
      <div className="sidebar-content">
        {/* Add your sidebar content here */}
      </div>
    </div>
  );
};

export default Sidebar;