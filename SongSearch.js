import React, { useState } from 'react';
import axios from 'axios';
import '../styles/song.css';

function SongSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
  
    musicDirector: '',
    albumName: '',
    singer: '' 
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!searchCriteria.musicDirector && !searchCriteria.albumName && !searchCriteria.singer) {
        setErrorMessage('Please fill in at least one search criteria.');
        return;
      }
      const response = await axios.get('http://localhost:3000/api/songs', {
        params: searchCriteria
      });
  
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setErrorMessage('No songs found matching the search criteria.');
      } else {
        setErrorMessage('');
        alert('Songs searched successfully.');
      }
    } catch (error) {
      console.error('Error searching songs:', error);
      setErrorMessage('An error occurred while searching for songs. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Song Search</h2>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label htmlFor="musicDirector">Music Director:</label>
          <input
            type="text"
            id="musicDirector"
            name="musicDirector"
            value={searchCriteria.musicDirector}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="albumName">Album Name:</label>
          <input
            type="text"
            id="albumName"
            name="albumName"
            value={searchCriteria.albumName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="singer">Singer:</label>
          <input
            type="text"
            id="singer"
            name="singer"
            value={searchCriteria.singer}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {errorMessage && (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      )}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map(song => (
              <li key={song._id}>
                <h4>{song.name}</h4>
                <p><strong>Singer:</strong> {song.singer}</p>
                <p><strong>Album Name:</strong> {song.albumName}</p>
                <p><strong>Music Director:</strong> {song.musicDirector}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SongSearch;
