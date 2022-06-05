import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseconfig";
import { useEffect,useState } from 'react';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const [autho,setautho]=useState('logged out')
const [usern,setuser]=useState('')

export const signInWithGoogle = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const userin = result.user;
    console.log(userin);
    setautho('logged in')
    setuser(userin)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    setautho('logged out')
    setuser('')
  });
}
export const anonySignIn = () =>{
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);
    setautho('logged in')
    setuser(uid)
  } else {
    setautho('logged out')
    setuser('')
  }
});
}
export {usern,setuser}