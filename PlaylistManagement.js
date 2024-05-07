import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './Playlist';
import PlaylistSearch from './PlaylistSearch';
import '../styles/playlist.css';

function PlaylistManagement() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [userId, setUserId] = useState('611d65212cbbf20015e0408a');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/playlists');
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError('Error fetching playlists');
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const trimmedName = newPlaylistName.trim();

      if (!trimmedName) {
        
        setError('Playlist name is required');
        return;
      }
      const playlistData = {
        name: trimmedName,
        userId: userId,
        songs: [] 
      };
      await axios.post('http://localhost:3000/api/playlists', playlistData);
      alert('playlist created successfully.');
      fetchPlaylists();
     
      setNewPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Error creating playlist');
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:3000/api/playlists/${playlistId}`);
      alert('playlist deleted successfully.');
      fetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setError('Error deleting playlist');
    }
  };

  return (
    <div className="playlist-management">
      <PlaylistSearch/>
      <div>
        <h3>Create New Playlist:</h3>
        <form onSubmit={handleCreatePlaylist}>
          <label htmlFor="newPlaylistName">Playlist Name:</label>
          <input
            type="text"
            id="newPlaylistName"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button type="submit">Create Playlist</button>
        </form>
      </div>
      <div>
        <h3>Welcome to Your Playlist:</h3>
        {playlists.map(playlist => (
          <div key={playlist._id}>
            <PlaylistWithSongs playlist={playlist} onDeletePlaylist={handleDeletePlaylist} />
          </div>
        ))}
      </div>
    </div>
    
  );
}

const PlaylistWithSongs = ({ playlist, onDeletePlaylist }) => {
  const [songsDetails, setSongsDetails] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); 
  const [shuffleMode, setShuffleMode] = useState(false);

  useEffect(() => {
    fetchSongsDetails();
  }, []);

  const fetchSongsDetails = async () => {
    try {
      const songsPromises = playlist.songs.map(songId =>
        axios.get(`http://localhost:3000/api/songs/${songId}`)
      );
      const songsResponses = await Promise.all(songsPromises);
      const songsData = songsResponses.map(response => response.data);
      setSongsDetails(songsData);
    } catch (error) {
      console.error('Error fetching songs details:', error);
    }
  };

  const handlePlayStop = () => {
    if (isPlaying) {
     
      setIsPlaying(false);
    } else {
      
      setIsPlaying(true);
    }
  };

  const handleRepeat = () => {
    
  };

  const handleShuffle = () => {
    setShuffleMode(!shuffleMode);
    
  };


  const handleRemoveSong = async (songId) => {
    try {
      
      await axios.delete(`http://localhost:3000/api/playlists/${playlist._id}/remove-song/${songId}`);
      alert('Song remove from playlist successfully.');
      fetchSongsDetails();
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  return (
    <div>
    <div className="playlist">
      <h4>playlist: {playlist.name}</h4>
      
      <ul>
        {songsDetails.map(song => (
          <li key={song._id}>
            
            <p><strong>Song Name:</strong> {song.name}</p>
            <p><strong>Singer:</strong> {song.singer}</p>
            <p><strong>Music Director:</strong> {song.musicDirector}</p>
            <p><strong>Release Date:</strong> {song.releaseDate}</p>
            <p><strong>Album Name:</strong> {song.albumName}</p>
            <div className="controls" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary" onClick={handlePlayStop}>{isPlaying ? 'Stop' : 'Play'}</button>
              <button type="button" class="btn btn-primary" onClick={handleRepeat}>Repeat</button>
              <button type="button" class="btn btn-primary" onClick={handleShuffle}>Shuffle</button>
            </div>
            <button onClick={() => handleRemoveSong(song._id)}>Remove Song</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onDeletePlaylist(playlist._id)}>Delete Playlist</button>
    </div>
    
    </div>
  );
};

export default PlaylistManagement;
