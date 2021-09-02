import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyD7Bvo675BXV15k4yzUOXE0Yr0r2yy8T0M",
  
    authDomain: "login-reactjs-firebase.firebaseapp.com",
  
    projectId: "login-reactjs-firebase",
  
    storageBucket: "login-reactjs-firebase.appspot.com",
  
    messagingSenderId: "350400330540",
  
    appId: "1:350400330540:web:45a04166677c542cb4ca89"
  
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };