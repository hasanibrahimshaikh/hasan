import React from 'react';

const Playlist = ({ playlist }) => {
    return (
        <div className="playlist">
            <h4>{playlist.name}</h4>
            <p><strong></strong></p>
            <ul>
            {playlist.songs.map(song => (
                    <li key={song._id}>
                        <p><strong>Song Name:</strong> {song.name}</p>
                        <p><strong>Singer:</strong> {song.singer}</p>
                        <p><strong>Music Director:</strong> {song.musicDirector}</p>
                        <p><strong>Release Date:</strong> {song.releaseDate}</p>
                        <p><strong>Album Name:</strong> {song.albumName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
