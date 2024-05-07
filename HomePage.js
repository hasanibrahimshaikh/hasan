import React from 'react';
import { Link } from 'react-router-dom';
import'./Home.css';

function HomePage() {
  return (
    <div class="home">
      <h2>Welcome to Music Library</h2>
      <p>Discover your playlists and songs!</p>
      <nav>
        <ul>
          <li><Link to="/songlist">View All Songs</Link></li>
          <li><Link to="/playlists">View All Playlists</Link></li>
          
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
