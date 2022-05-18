// Import the functions you need from the SDKs you need
import firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR5lOvX7rswMnXh1gV4yR_LWbw3aFv0e0",
  authDomain: "video-chat-app-23932.firebaseapp.com",
  projectId: "video-chat-app-23932",
  storageBucket: "video-chat-app-23932.appspot.com",
  messagingSenderId: "389528515333",
  appId: "1:389528515333:web:25670e67fbd51f1d1abd6c",
  measurementId: "G-83RT9CMT48",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default fire;
