import React from 'react';
import { Link } from 'react-router-dom';
import'../App.css';

function Admin() {
  return (
    <div class="home">
      <h2>Welcome to Songs Library</h2>
      <p>"Discover your favorite songs library"</p>
      <nav>
        <ul>
          <li><Link to="/songs">View Songs Library</Link></li>
          
        </ul>
      </nav>
    </div>
  );
}

export default Admin;
