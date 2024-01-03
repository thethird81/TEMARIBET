// src/AudioList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AudioFileList = () => {
  const [folderId, setFolderId] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);

  useEffect(() => {
    const fetchFolderId = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/drive/v3/files?q=name='abye'+and+mimeType='application/vnd.google-apps.folder'&key=AIzaSyBjNLkmXuGT6vr4ziDu3JJFF4V0KVCuEos`
        );

        if (response.data.files.length > 0) {
          setFolderId(response.data.files[0].id);
        } else {
          console.error('Folder not found');
        }
      } catch (error) {
        console.error('Error fetching folder ID:', error);
      }
    };

    fetchFolderId();
  }, []);

  useEffect(() => {
    if (folderId) {
      const fetchAudioUrls = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/drive/v3/files?q=mimeType='audio/mp3'+and+'${folderId}'+in+parents&key=AIzaSyBjNLkmXuGT6vr4ziDu3JJFF4V0KVCuEos`
          );

          const urls = response.data.files.map((file) => file.webContentLink);
          setAudioUrls(urls);
        } catch (error) {
          console.error('Error fetching audio URLs:', error);
        }
      };

      fetchAudioUrls();
    }
  }, [folderId]);

  return (
    <div>
      <h1>Audio List</h1>
      <ul>
        {audioUrls.map((url, index) => (
          <li key={index}>
            <audio controls>
              <source src={url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioFileList;
