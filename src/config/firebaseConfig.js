import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "meu-controle-financeiro-1899d.firebaseapp.com",
  projectId: "meu-controle-financeiro-1899d",
  storageBucket: "meu-controle-financeiro-1899d.appspot.com",
  messagingSenderId: "878388050618",
  appId: "1:878388050618:web:6d4834969362ee13402083",
  measurementId: "G-QTT9PNFEJW",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export {
  firebase,
  auth,
  app,
  db,
  googleAuthProvider,
  githubAuthProvider,
  storage,
};
