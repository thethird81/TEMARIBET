import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import {fetchAudioFiles } from '../FirebaseAudio/fetchUrl';
import Dialog from '@mui/material/Dialog';

const AudioPlayer = ({setAudioEnded}) => {

  const [audioCollection, setAudioCollection] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  useEffect(() => {
    // Replace 'path/to/your/directory' with the actual path to your directory
    const directoryPath = '/abye/akababi';

    fetchAudioFiles(directoryPath)
      .then((audioFiles) => setAudioCollection(audioFiles))
      .catch((error) => console.error("Error setting audio collection:", error));
  }, []);

  const playPauseToggle = () => {
    const audio = document.getElementById('audioPlayer');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const audio = document.getElementById('audioPlayer');
    const progress = (audio.currentTime / audio.duration) * 100;
    setAudioProgress(progress);
  };

  const handleTimeUpdate = () => {
    updateProgress();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
    setCurrentAudioIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="App">
      <h1>Firebase Storage Audio Player</h1>
      <button onClick={playPauseToggle} className="play-pause-button">
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <div className="audio-player">
        <audio
          id="audioPlayer"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
          <source src={audioCollection[currentAudioIndex]?.src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${audioProgress}%` }}
          ></div>
        </div>
      </div>
      <ul>
        {audioCollection.map((audio, index) => (
          <li key={index}>
            <strong>{audio.name}</strong>: {audio.src}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default AudioPlayer;
