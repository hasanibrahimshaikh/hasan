import React, { useState, useRef } from 'react';
import '../App.css';

function PlayerControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
      console.log('Playing the song');
    } else {
      audioRef.current.pause();
      console.log('Pausing the song');
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    console.log('Stopping the song');
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
    console.log(isRepeat ? 'Repeat mode disabled' : 'Repeat mode enabled');
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    console.log(isShuffle ? 'Shuffle mode disabled' : 'Shuffle mode enabled');
  };

  return (
    <div className="player-controls">
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRepeat}>{isRepeat ? 'Disable Repeat' : 'Enable Repeat'}</button>
      <button onClick={handleShuffle}>{isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}</button>
      <audio ref={audioRef} src="path_to_your_audio_file.mp3" />
    </div>
  );
}

export default PlayerControls;
