import React, { useState, useEffect } from 'react';
import '../globals/Links.css';

function Links() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/links')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setLinks(data))
      .catch(error => console.error('Error fetching links:', error));
  }, []);

  const handleAddLink = (e) => {
    e.preventDefault();

    const formattedTitle = newLink.title.charAt(0).toUpperCase() + newLink.title.slice(1);

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(newLink.url)) {
      setErrorMessage('Invalid URL. Please ensure it ends with .com, .in, .ai, etc.');
      return;
    }

    fetch('http://localhost:3000/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newLink, title: formattedTitle }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add link');
        }
        return response.json();
      })
      .then(data => {
        setLinks([...links, data]);
        setNewLink({ title: '', url: '' });
        setShowAddForm(false);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error adding link:', error);
        setErrorMessage('Failed to add link. Please try again.');
      });
  };

  const handleDeleteLink = (id) => {
    fetch(`http://localhost:3000/links/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete link');
        }
        setLinks(links.filter(link => link.id !== id));
      })
      .catch(error => {
        console.error('Error deleting link:', error);
        setErrorMessage('Failed to delete link. Please try again.');
      });
  };

  return (
    <div className="links-container card">
      {!showAddForm ? (
        <>
          <div className="links-header">
            <h3 className="links-title">My Inventory</h3>
            <button className="links-add-button" onClick={() => setShowAddForm(true)}>+</button>
          </div>
          <div className="links-list">
            {links.map(link => (
              <div key={link.id} className="link-item">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-text">{link.title}</a>
                <button className="delete-button" onClick={() => handleDeleteLink(link.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="add-link-form">
          <button className="back-button" onClick={() => setShowAddForm(false)}>&#8592;</button>
          <h4 className="add-form-title">Creating a link</h4>
          <form onSubmit={handleAddLink}>
            <input
              type="text"
              className="add-form-input"
              placeholder="Title"
              value={newLink.title}
              onChange={(e) => setNewLink({...newLink, title: e.target.value})}
            />
            <input
              type="text"
              className="add-form-input"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            />
            <button type="submit" className="add-form-submit-button">Add</button>
          </form>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Links;