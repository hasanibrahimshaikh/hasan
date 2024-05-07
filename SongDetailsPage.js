import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/song.css';

function SongDetailsPage() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    axios.get(`/api/songs/${id}`)
      .then(response => {
        setSong(response.data);
      })
      .catch(error => {
        console.error('Error fetching song details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Song Details</h2>
      {song ? (
        <div>
          <h3>{song.name}</h3>
          <p><strong>Singer:</strong> {song.singer}</p>
          <p><strong>Album:</strong> {song.album}</p>
          <p><strong>Music Director:</strong> {song.musicDirector}</p>
          <p><strong>Release Date:</strong> {song.releaseDate}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default SongDetailsPage;
