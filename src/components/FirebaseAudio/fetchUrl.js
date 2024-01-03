import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';

const firebaseConfig = {

    apiKey: "AIzaSyCxpLu40z5KoW-zUONkJNiST_HgywoZ3Gs",
    authDomain: "temaribet-ff8cf.firebaseapp.com",
    projectId: "temaribet-ff8cf",
    storageBucket: "temaribet-ff8cf.appspot.com",
    messagingSenderId: "419401679341",
    appId: "1:419401679341:web:a178a1911a9df41c1867e4",
    measurementId: "G-2T83L9LT4K"
};

const app = initializeApp(firebaseConfig);

export const fetchAudioFiles = async (directoryPath) => {
  const storage = getStorage(app);
  const directoryRef = ref(storage, directoryPath);

  try {
    const result = await listAll(directoryRef);
    const audioFiles = await Promise.all(result.items.map(async (item) => {
      const downloadUrl = await getDownloadURL(item);
      return { name: item.name, src: downloadUrl };
    }));

    return audioFiles;
  } catch (error) {
    console.error("Error fetching audio files:", error);
    return [];
  }
};

//export default fetchAudioFiles;
// export const fetchUrl = async () => {




//     const firebaseConfig = {

//         apiKey: "AIzaSyCxpLu40z5KoW-zUONkJNiST_HgywoZ3Gs",
//         authDomain: "temaribet-ff8cf.firebaseapp.com",
//         projectId: "temaribet-ff8cf",
//         storageBucket: "temaribet-ff8cf.appspot.com",
//         messagingSenderId: "419401679341",
//         appId: "1:419401679341:web:a178a1911a9df41c1867e4",
//         measurementId: "G-2T83L9LT4K"
//     };


//     // Replace with your Firebase project configuration


//       // Initialize Firebase
//       const app = initializeApp(firebaseConfig);

//       // Create a reference to the Firebase Storage bucket
//       const storage = getStorage(app);

//       // Replace 'path/to/your/directory' with the actual path to your directory
//       const directoryPath = '/abye/akababi';

//       // Get a reference to the directory
//       const directoryRef = ref(storage, directoryPath);

//       // List all items in the directory
//       listAll(directoryRef)
//       .then(async (result) => {
//         // Get file details (name and full path)
//         const urls = await Promise.all(result.items.map(async (item) => {
//           const downloadUrl = await getDownloadURL(item);
//           return { name: item.name, src: downloadUrl };
//         }));
//         console.log(urls);
//        return urls;
//       })
//       .catch((error) => {
//         console.error("Error listing files:", error);
//       });


//   };