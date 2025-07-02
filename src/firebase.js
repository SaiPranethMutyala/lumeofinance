// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArWGBvPuHHpdMVz9CXTpVKXxcmABc2UOU",
  authDomain: "lumeowebsite.firebaseapp.com",
  projectId: "lumeowebsite",
  storageBucket: "lumeowebsite.firebasestorage.app",
  messagingSenderId: "386613569322",
  appId: "1:386613569322:web:2e73c6bca76abca0122053",
  measurementId: "G-6HQR65R3QQ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export the Firebase services for use in other components
export { app, analytics, db, auth, storage };