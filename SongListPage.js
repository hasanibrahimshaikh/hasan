import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongSearch from './SongSearch';
import '../styles/song.css';

function SongListPage() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    name: '',
    singer: '',
    albumName: '',
    releaseDate: '',
    musicDirector: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    singer: '',
    albumName: '',
    releaseDate: '',
    musicDirector: ''
  });

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleDeleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/songs/${id}`);
      alert('song deleted successfully.');
      setSongs(songs.filter(song => song._id !== id));
    } catch (error) {
      console.error('Error deleting song:', error);
      
    }
  };

  const handleEditSong = (song) => {
    setNewSong({
      _id: song._id,
      name: song.name,
      singer: song.singer,
      albumName: song.albumName,
      releaseDate: song.releaseDate,
      musicDirector: song.musicDirector
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let isValid = true;
      const newErrors = { ...errors };
      Object.keys(newSong).forEach(key => {
        if (!newSong[key]) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
          isValid = false;
        } else {
          newErrors[key] = '';
        }
      });
  
      setErrors(newErrors);
  
      if (isValid) {
        let response;
        if (newSong._id) {
          response = await axios.put(`http://localhost:3000/api/songs/${newSong._id}`, newSong);
          alert('Song updated successfully.');
        } else {
          response = await axios.post('http://localhost:3000/api/songs', newSong);
          alert('Song created successfully.');
        }
        setNewSong({
          name: '',
          singer: '',
          albumName: '',
          releaseDate: '',
          musicDirector: ''
        });
        fetchSongs();
      }
    } catch (error) {
      console.error('Error creating/updating song:', error);
    }
  };
  return (
    <div className='song-management'>
      <SongSearch />
      <h2>.....Song List.....</h2>
      <div>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={newSong.name} onChange={handleChange} />
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="singer">Singer:</label>
            <input type="text" id="singer" name="singer" value={newSong.singer} onChange={handleChange} />
            {errors.singer && <span style={{ color: 'red' }}>{errors.singer}</span>}
          </div>
          <div>
            <label htmlFor="albumName">Album Name:</label>
            <input type="text" id="albumName" name="albumName" value={newSong.albumName} onChange={handleChange} />
            {errors.albumName && <span style={{ color: 'red' }}>{errors.albumName}</span>}
          </div>
          <div>
            <label htmlFor="releaseDate">releaseDate:</label>
            <input type="date" id="releaseDate" name="releaseDate" value={newSong.releaseDate} onChange={handleChange} />
            {errors.releaseDate && <span style={{ color: 'red' }}>{errors.releaseDate}</span>}
          </div>
          <div>
            <label htmlFor="musicDirector">Music Director:</label>
            <input type="text" id="musicDirector" name="musicDirector" value={newSong.musicDirector} onChange={handleChange} />
            {errors.musicDirector && <span style={{ color: 'red' }}>{errors.musicDirector}</span>}
          </div>
          <button type="submit">{newSong._id ? 'Update Song' : 'Create Song'}</button>
        </form>
      </div>

      <div>
        {songs.map(song => (
          <div key={song._id}>
            <h3>{song.name}</h3>
            <p><strong>Name:</strong> {song.name}</p>
            <p><strong>Singer:</strong> {song.singer}</p>
            <p><strong>Album Name:</strong> {song.albumName}</p>
            <p><strong>releaseDate:</strong> {song.releaseDate}</p>
            <p><strong>Music Director:</strong> {song.musicDirector}</p>
            <button onClick={() => handleEditSong(song)}>Update</button>
            <button onClick={() => handleDeleteSong(song._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongListPage;
