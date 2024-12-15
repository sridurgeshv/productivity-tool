import React, { useState } from 'react';
import { SettingsIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import '../globals/Dashboard.css';

const SettingsButton = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="settings-button-container">
      <button className="settings-button" onClick={toggleSidebar}>
        <SettingsIcon size={24} />
      </button>
      {showSidebar && <Sidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default SettingsButton;