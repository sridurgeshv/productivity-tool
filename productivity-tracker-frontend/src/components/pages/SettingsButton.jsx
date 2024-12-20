import React from 'react';
import { SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../globals/Dashboard.css';

const SettingsButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/settings');
  };

  return (
    <div className="settings-button-container">
      <button className="settings-button" onClick={handleButtonClick}>
        <SettingsIcon size={24} />
      </button>
    </div>
  );
};

export default SettingsButton;
