import firebase from "firebase/compat/app";
import "firebase/auth";
import { firebaseConfig } from "../config/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export default app;
