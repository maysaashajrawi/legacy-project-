import firebase from "firebase/app";
import "firebase/storage";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDDOdg9AwqWQkB2t7J8LzYnYchj8MLCF9w",
    authDomain: "imagejs-9709d.firebaseapp.com",
    projectId: "imagejs-9709d",
    storageBucket: "imagejs-9709d.appspot.com",
    messagingSenderId: "90548946794",
    appId: "1:90548946794:web:ae364d5aa207f04b0a0713"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

const storage = firebase.storage();
export { storage, firebase as default};