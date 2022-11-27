import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCBmXYzvmQQYX6tU4a6Z-eRkFOK1XWfLZ8",
  authDomain: "projectfinal-80a38.firebaseapp.com",
  projectId: "projectfinal-80a38",
  storageBucket: "projectfinal-80a38.appspot.com",
  messagingSenderId: "1161543022",
  appId: "1:1161543022:web:28f2d6098ef551d80b157f",
  measurementId: "G-HTXTHNN7X0"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
