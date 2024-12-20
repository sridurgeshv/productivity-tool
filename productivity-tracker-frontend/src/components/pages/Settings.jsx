import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get-user/${user.uid}`);
        setFormData({
          displayName: response.data.display_name || '',
          photoURL: response.data.photo_url || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/update-user', {
        uid: user.uid,
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });

      if (response.data.message === 'User updated successfully') {
        // Update AuthContext with new user data
        setUser((prevUser) => ({
          ...prevUser,
          displayName: formData.displayName,
          photoURL: formData.photoURL
        }));
        alert('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      alert('Failed to update user');
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
