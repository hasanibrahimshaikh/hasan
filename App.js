import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Home from './Components/Home';
import SongList from './Components/SongList';
import SongListPage from './Components/SongListPage';
import SongDetailsPage from './Components/SongDetailsPage';
import PlaylistManagement from './Components/PlaylistManagement';
import PlayerControls from './Components/PlayerControls';
import Playlist from './Components/Playlist';
import Admin from './Components/Admin';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/songs" element={<SongListPage  />}/>
          <Route path="/song/:id" element={<SongDetailsPage  />} />
          <Route exact path="/songlist" element={<SongList />} />
          <Route path="/playlists" element={<PlaylistManagement  />} />
          <Route path="/playlist" element={<Playlist  />} />
          <Route path="/playerControls" element={<PlayerControls  />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register  />}/>
          <Route path="/logout" element={<Logout  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
