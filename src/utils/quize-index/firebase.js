// import firebase from "firebase/app";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxpLu40z5KoW-zUONkJNiST_HgywoZ3Gs",
  authDomain: "temaribet-ff8cf.firebaseapp.com",
  projectId: "temaribet-ff8cf",
  storageBucket: "temaribet-ff8cf.appspot.com",
  messagingSenderId: "419401679341",
  appId: "1:419401679341:web:a178a1911a9df41c1867e4",
  measurementId: "G-2T83L9LT4K"
};

//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


