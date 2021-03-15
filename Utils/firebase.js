import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBE0BshdPs5EIPPE_j-CE8N5m65tWV69NE",
    authDomain: "restaurants-4471f.firebaseapp.com",
    projectId: "restaurants-4471f",
    storageBucket: "restaurants-4471f.appspot.com",
    messagingSenderId: "214628658051",
    appId: "1:214628658051:web:53c642ff6ecff1c3b424b6"
  };

  export const firebaseApp =  firebase.initializeApp(firebaseConfig);