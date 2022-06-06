import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseconfig";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const anonySignIn = () =>{
    const router=useRouter()

  onAuthStateChanged(auth, (user) => {
    
  if (user) {
    const uid = user.uid;
    console.log(uid);
    router.push('/dashboard')
    //setautho('logged in')
  } else {
    //setautho('logged out')
  }
});
}
export default anonySignIn