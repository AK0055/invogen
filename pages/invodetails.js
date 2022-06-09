import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import {invotest} from './invotest'
import { useRouter } from 'next/router'
import invobj from "./invos";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
export var targetinv = {
    invonum: '',
    invodate:'',
    due:'',
    curr:'',
    tax:''
  };
 
export default function Main() {
    const router= useRouter()
    const [invonum,setinvonum]= useState('')
    const [invodate, setinvodate] = useState(new Date('2014-08-18T21:11:54'));
    const [due, setdue] = useState(new Date('2014-08-18T21:11:54'));
    const [curr,setcurr]= useState('')
    const [tax,settax]= useState('')
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
  const addinv=()=> {
    invobj.invonum=invonum
    invobj.invodate=invodate
    invobj.due=due
    invobj.curr=curr
    invobj.tax=tax
    console.log(invobj)
    const returnedinv = Object.assign(targetinv, invobj);


  }
  const finalpager=()=> {
    addinv();
    router.push('/invotest')
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
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Enter details</p>
      </div>
      
      <form>
    <div class="p-10 grid gap-6 mb-6 lg:grid-cols-2 ">
        
        <div>
            <label for="invonum" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Invoice number</label>
            <input onChange={(e) => setinvonum(e.target.value)} type="text" id="invonum" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2022.0001" required/>
        </div>  
        <div>
            <label for="invodate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Invoice date</label>
            <input onChange={(e) => setinvodate(e.target.value)} type="date" id="invodate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2022.0001" required/>
        </div>
        <div>
            <label for="due" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Due date</label>
            <input onChange={(e) => setdue(e.target.value)} type="date" id="due" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2022.0001" required/>
        </div>
        <div>
        <label for="curr" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Currency</label>
            <select onChange={(e) => setcurr(e.target.value)} id="curr" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a currency</option>
            <option value="USD">US Dollar</option>
            <option value="INR">Indian Rupee</option>
            <option value="EUR">Euro</option>
            <option value="CAD">Canadian Dollar</option>
            </select>
        </div>
        <div>
        <label onChange={(e) => settax(e.target.value)}for="tax" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Tax notation</label>
            <select id="tax" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a Tax notation</option>
            <option value="GST">GST</option>
            <option value="VAT">VAT</option>
            </select>
        </div>
        
        
      </div>
      </form>
      <div class="px-5">
      <button onClick={invotest} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
      <button onClick={finalpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

      </div>


     <Footer/>
    </div>

  
  );
}
