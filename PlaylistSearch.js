import React, { useState } from 'react';
import axios from 'axios';
import '../styles/playlist.css';

function PlaylistSearch() {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSearchCriteria(e.target.value);

    setErrorMessage('');
  };

  const handleSearch = async () => {
    if (!searchCriteria.trim()) {
      setErrorMessage('Please enter a keyword to search.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/playlists', {
        params: { keyword: searchCriteria }
      });
      const playlists = response.data;
      if (playlists.length === 0) {
        setErrorMessage('No playlists found for the given keyword.');
      } else {
        setSearchResults(playlists);
      }
    } catch (error) {
      console.error('Error searching playlists:', error);

    }
  };

  return (
    <div>
      <h2>Playlist Search</h2>
      <div>
        <label htmlFor="keyword">Keyword:</label>
        <input
          type="text"
          id="keyword"
          value={searchCriteria}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map(playlist => (
              <li key={playlist._id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlaylistSearch;
