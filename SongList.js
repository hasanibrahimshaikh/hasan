import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongSearch from './SongSearch';
import '../styles/song.css';

function SongListPage() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/songs');
        setSongs(response.data);
        alert('songs fetched successfully.');
      } catch (error) {
        console.error('Error fetching songs:', error);
       
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      await axios.put(`http://localhost:3000/api/playlists/${selectedPlaylist}/add-songs/${selectedSong}`);
      alert('Song added to playlist successfully.');
    } catch (error) {
      console.error('Error adding song to playlist:', error);
     
    }
  };

  return (
    <div className='song-management'>
       <div className="center-content">
      <SongSearch />
      <h2>.....Song List.....</h2>
      <div>
        {songs.map(song => (
          <div key={song._id}>
            <h3>{song.name}</h3>
            <p><strong>Name:</strong> {song.name}</p>
            <p><strong>Singer:</strong> {song.singer}</p>
            <p><strong>Album Name:</strong> {song.albumName}</p>
            <p><strong>releaseDate:</strong> {song.releaseDate}</p>
            <p><strong>Music Director:</strong> {song.musicDirector}</p>
           
            <div>
              <button onClick={() => setSelectedSong(song._id)}>Add to Playlist</button>
              {selectedSong === song._id && (
                <div>
                  <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                    <option value="">Select Playlist</option>
                    {playlists.map(playlist => (
                      <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                    ))}
                  </select>
                  <button onClick={handleAddToPlaylist}>Add</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default SongListPage;
