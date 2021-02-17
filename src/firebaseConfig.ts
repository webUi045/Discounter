//import firebase from "firebase";
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyD_P87GdS5zbKbSRYvB1txWG1gM-xYJjUc",
  authDomain: "discounter-813bc.firebaseapp.com",
  databaseURL: "https://discounter-813bc-default-rtdb.firebaseio.com",
  projectId: "discounter-813bc",
  storageBucket: "discounter-813bc.appspot.com",
  messagingSenderId: "233228191988",
  appId: "1:233228191988:web:3a1c221cd5bb987e78b6a1",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
