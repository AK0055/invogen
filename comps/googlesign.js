import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./firebaseconfig";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function googlesign() {
  var flag=0

   signInWithPopup(auth, provider)
   .then((result) => {

     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     const userin = result.user;
     console.log(userin);
     //setautho('logged in')
     console.log(username);
     
   }).catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     //const email = error.customData.email;
     const credential = GoogleAuthProvider.credentialFromError(error);
     //setautho('logged out')
   });
}
 
