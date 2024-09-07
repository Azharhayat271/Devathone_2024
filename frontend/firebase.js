// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLir-RHnMrkBTVCRJy1_KKfPp3u_rJnJk",
  authDomain: "fyp-project-8223e.firebaseapp.com",
  projectId: "fyp-project-8223e",
  storageBucket: "fyp-project-8223e.appspot.com",
  messagingSenderId: "412053649901",
  appId: "1:412053649901:web:aeb954786c259774818fe4",
  measurementId: "G-YZ1D46FK51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);  // Initialize Firebase Authentication
const googleProvider = new GoogleAuthProvider();  // Create a Google provider instance
const microsoftProvider = new OAuthProvider('microsoft.com');


export { storage, ref, uploadBytes, getDownloadURL, auth, googleProvider, signInWithPopup,microsoftProvider };
