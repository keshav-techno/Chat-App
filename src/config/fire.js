import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDY-SHFjXWS488XaAb1xh_tFJGfa9ubt44",
    authDomain: "chat-app-41e78.firebaseapp.com",
    databaseURL: "https://chat-app-41e78.firebaseio.com",
    projectId: "chat-app-41e78",
    storageBucket: "chat-app-41e78.appspot.com",
    messagingSenderId: "382373070555",
    appId: "1:382373070555:web:f2ba4f3ec88b2649"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;