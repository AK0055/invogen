import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect,useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../comps/firebaseconfig";
export default function Home() {
  {var [username,setUsername]=useState('logged out');     var [email,setEmail]=useState('');  var [pwd,setPwd]=useState('');  
  const router = useRouter()   }
  const googlehandler=()=>{
    googlesign();
    console.log(username)
    console.log(router.pathname)
    if(username=='logged in' || router.pathname=='/' ){
      router.push('/dashboard');
    }
  }
  function googlesign() {
    const app = initializeApp(firebaseConfig);const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
 
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userin = result.user;
      console.log(userin);
      //setautho('logged in')
      console.log(username);
      setUsername('logged in')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setUsername('logged out')
    });
 }
 const signuphandler=()=>{
  signup();
  console.log(username)
  console.log(router.pathname)
  if(username=='logged in' || router.pathname=='/' ){
    router.push('/dashboard');
  }
 }
 function signup(){
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  
  createUserWithEmailAndPassword(auth, email, pwd)
  .then((userCredential) => {
    const user = userCredential.user;
    setUsername('logged in')
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setUsername('logged out')
  });

 }
 const anonysignhandler=()=>{
  anonysign();
  console.log(username)
  console.log(router.pathname)
  if(username=='logged in' && router.pathname=='/' ){
    router.push('/dashboard');
  }
 }
 function anonysign(){
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    
    if (user) {
      const uid = user.uid;
      console.log(uid);
      setUsername('logged in')
    } else {
      setUsername('logged out')
    }
  });
 }
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Invogen</title>
        <meta name="description" content="NextJS app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Invogen</a>
        </h1>

        <p className={styles.description}>
          Get started by Signing up!
        </p>

        <div className={styles.grid}>
        <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">Create an account</h5>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email"   onChange={(e) => setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"/>
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
            <input type="password"   onChange={(e) => setPwd(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
        </div><br/>

        <div class="flex items-start">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                  <button className="login-provider-button 	translate-x-5	" onClick={googlehandler}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
                  </button>
                  <button className="login-provider-button 	translate-x-10	" onClick={anonysignhandler}>
                    <img className="" src="https://img.icons8.com/material-outlined/48/undefined/user--v1.png" alt="user icon"/>
                  </button>
                </div>
            </div>
        </div>
        <button type="submit" onClick={signuphandler} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already have an account? 
        <Link href="/login">
        <a class="text-blue-700 hover:underline dark:text-blue-500">Log In</a>
        </Link>
        </div>
        
    </form>
</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
