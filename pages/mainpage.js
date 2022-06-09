import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRouter } from 'next/router'

import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import {invotest} from './invotest'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc, getDoc 
} from "firebase/firestore";
import {
  auth,
  db
} from "../comps/firebaser";
import senderobj from "./senders";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
export var targetsen = {
  company: '',
  street:'',
  zip:0,
  city:'',
  country:''
};

export default function Main() {
  const router= useRouter()
  const [company,setcompany]= useState('')
  const [street,setstreet]= useState('')
  const [zip,setzip]= useState(0)
  const [city,setcity]= useState('')
  const [country,setcountry]= useState('')
  const [usern,setUsern]=useState('User')
  
  const getemail=(user)=>{
    try{
      console.log(user)
      if(user.email!=null){
        const emailarr = user.email.split("@");
        var curruser= emailarr[0];
        setUsern(curruser)
        console.log(usern)
      }

    }

    catch (TypeError) {
      const user =  auth.currentUser;
      console.log(user)
      /* const emailarr = user.email.split("@");
        var curruser= emailarr[0];
        setUsern(curruser)
        console.log(usern) */
    }
  }
  const addsender=()=> {
    senderobj.company=company
    senderobj.street=street
    senderobj.zip=zip
    senderobj.city=city
    senderobj.country=country
    console.log(senderobj)
    const returnedclient = Object.assign(targetsen, senderobj);


  }
  const nextpager=()=> {
    addsender();
    router.push('/main2page')
  }
  useEffect(() => {
    const user =  auth.currentUser;
    getemail(user);
  }, []);
  return (
    <div class='bg-white dark:bg-gray-800'>
      <Head>
        <title>Mainpage</title>
        <meta name="description" content="invogen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar usern={usern}/>
      <div className='text-gray-900 dark:text-gray-300'>
      <h5 className={styles.title}>
          Hi, <a>{usern}</a> 👋
        </h5>
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Enter Sender details</p>
      </div>
      
      <form>
    <div class="p-10 grid gap-6 mb-6 lg:grid-cols-2 ">
        
        <div>
            <label for="scompany" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company</label>
            <input onChange={(e) => setcompany(e.target.value)}type="text" id="scompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Akompany" required/>
        </div>  
        <div>
            <label for="saddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Street</label>
            <input onChange={(e) => setstreet(e.target.value)}type="text" id="saddress" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="177A Bleecker Street" required/>
        </div>  
        <div>
            <label for="szip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
            <input onChange={(e) => setzip(e.target.value)}type="number" id="szip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="600011"  required/>
        </div>
        <div>
            <label for="scity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
            <input onChange={(e) => setcity(e.target.value)}type="text" id="scity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chennai" required/>
        </div>  
        <div>
            <label for="scountry" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
            <input onChange={(e) => setcountry(e.target.value)} type="text" id="scountry" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="India" required/>
        </div>  
      </div>
      </form>
      <div class="px-5">
      <button onClick={invotest} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
      <button onClick={nextpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

      </div>


     <Footer/>
    </div>

  
  );
}
