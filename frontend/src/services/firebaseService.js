import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBCeEyEJwBN6oi_db_2x6adMZttdMDnn4",
  authDomain: "movie-2026-ffd11.firebaseapp.com",
  projectId: "movie-2026-ffd11",
  storageBucket: "movie-2026-ffd11.firebasestorage.app",
  messagingSenderId: "969968339492",
  appId: "1:969968339492:web:188f685fe9bfd52a04c0b1",
};

let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization notice:', error.message);
}

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
};
