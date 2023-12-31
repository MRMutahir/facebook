import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword ,signOut} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, deleteDoc ,collection, addDoc, getDocs, setDoc, getDoc, doc, onSnapshot,getDocFromCache } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage ,ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Required for side-effects
// import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAQjUqTMdPGA8kRZMylSbKREdw06HMd33I",
    authDomain: "linear-sight-362821.firebaseapp.com",
    projectId: "linear-sight-362821",
    storageBucket: "linear-sight-362821.appspot.com",
    messagingSenderId: "807493054153",
    appId: "1:807493054153:web:2da342bcdb5652407b6718"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// firestore
const db = getFirestore(app);

export {
    deleteDoc  ,auth, getAuth, createUserWithEmailAndPassword, addDoc, db, doc, setDoc, collection, getDocs, onAuthStateChanged, 
    signInWithEmailAndPassword, getDoc, onSnapshot,getDocFromCache , getStorage ,ref, uploadBytesResumable, getDownloadURL ,signOut
}