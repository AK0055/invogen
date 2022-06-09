import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import {invotest} from './invotest'
import { useRouter } from 'next/router'

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
import {tarprodarr} from './prodarr'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
export var tarprodcopy = []
export default function Main() {
  const router= useRouter()
  const [prodn,setProdn]= useState('')
  const [pqty,setpqtyn]=useState(0)
  const [ptax,setptax]=useState(0)
  const [pprice,setprice]=useState(0)
  const [usern,setUsern]=useState('User')
  const getemail=(user)=>{
    try{
      if(user.email!=null){
        const emailarr = user.email.split("@");
        var curruser= emailarr[0];
        setUsern(curruser)
      }

    }

    catch (TypeError) {
      const user =  auth.currentUser;
      console.log(user)
      
    }
  }
  const addprod=()=> {
    var targetprod={
        "quantity": '',
        "description": '',
        "tax-rate": '',
        "price": ''
    }
    targetprod.description=prodn
    targetprod.quantity=pqty
    targetprod.taxrate=ptax
    targetprod.price=pprice
    console.log(targetprod)
    //const returnedobj = Object.assign(targetprod,obj);
    tarprodarr.push(targetprod)
    console.log(tarprodarr)
    tarprodcopy=tarprodarr
  }
  const prodpager=()=> {
    router.push('/invodetails')
  }
  
 
  useEffect(() => {
    const user =  auth.currentUser;
    getemail(user);
    
  }, );
  return (
    <div class='bg-white dark:bg-gray-800'>
      <Head>
        <title>Mainpage</title>
        <meta name="description" content="invogen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <div className='text-gray-900 dark:text-gray-300'>
      <h5 className={styles.title}>
          Hi, <a>{usern}</a> 👋
        </h5>
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Add your products</p>
      </div>
      <form>
    <div class="p-10 grid gap-6 mb-6 lg:grid-cols-2 ">
        
        <div>
            <label for="product" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product</label>
            <input onChange={(e) => setProdn(e.target.value)} type="text" id="product" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RTX 3060" required/>
            
        </div>  
        <div>
            <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
            <input type="number" onChange={(e) => setpqtyn(e.target.value)} id="quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100"  required/>
            
        </div>
        <div>
            <label for="taxrate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tax Rate</label>
            <input type="number" onChange={(e) => setptax(e.target.value)} id="taxrate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="8"  required/>
            
        </div>
        <div>
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
            <input type="number" onChange={(e) => setprice(e.target.value)} id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12999"  required/>
            
        </div>
    </div>
        <div class="p-5">
            <button onClick={addprod} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>

        </div>
    </form>
      
      <div class="px-5">
      <button onClick={invotest} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
      <button onClick={prodpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

      </div>


     <Footer/>
    </div>

  
  );
}
