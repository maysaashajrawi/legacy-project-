import firebase from "firebase/app";
import "firebase/storage";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAPYFn8ONiTjGjla9PdTvB1xtW102gd1Pw",
    authDomain: "imagejs-32cca.firebaseapp.com",
    projectId: "imagejs-32cca",
    storageBucket: "imagejs-32cca.appspot.com",
    messagingSenderId: "908782583723",
    appId: "1:908782583723:web:931b8f246dcf6491871cee"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
const storage = firebase.storage();
export { storage, firebase as default};
