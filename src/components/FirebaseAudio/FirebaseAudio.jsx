import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';

const FirebaseAudio = () => {
    const [fileList, setFileList] = useState([]);
    const [audioCollection, setAudioCollection] = useState([]);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const firebaseConfig = {
        apiKey: "AIzaSyCxpLu40z5KoW-zUONkJNiST_HgywoZ3Gs",
        authDomain: "temaribet-ff8cf.firebaseapp.com",
        projectId: "temaribet-ff8cf",
        storageBucket: "temaribet-ff8cf.appspot.com",
        messagingSenderId: "419401679341",
        appId: "1:419401679341:web:a178a1911a9df41c1867e4",
        measurementId: "G-2T83L9LT4K"
    };


    useEffect(() => {
      // Replace with your Firebase project configuration


      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Create a reference to the Firebase Storage bucket
      const storage = getStorage(app);

      // Replace 'path/to/your/directory' with the actual path to your directory
      const directoryPath = '/abye/akababi';

      // Get a reference to the directory
      const directoryRef = ref(storage, directoryPath);

      // List all items in the directory
      listAll(directoryRef)
      .then(async (result) => {
        // Get file details (name and full path)
        const files = await Promise.all(result.items.map(async (item) => {
          const downloadUrl = await getDownloadURL(item);
          return { name: item.name, src: downloadUrl };
        }));
        setAudioCollection(files);

      })
      .catch((error) => {
        console.error("Error listing files:", error);
      });
  }, []);

  const playNextAudio = () => {
    if (currentAudioIndex < audioCollection.length) {
      const { name, src } = audioCollection[currentAudioIndex];
      console.log("Current audio name:", name);
      console.log("Current audio src:", src);

      const audio = new Audio(src);
      audio.play();

      setCurrentAudioIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="App">
      <h1>Firebase Storage Audio Player</h1>
      <button onClick={playNextAudio}>Play Next Audio</button>
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

export default FirebaseAudio;
