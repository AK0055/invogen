import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import {invotest} from './invotest'
import { useRouter } from 'next/router'
import clientobj from "./clients";
import { motion } from 'framer-motion';

import {
  auth
} from "../comps/firebaser";

export var targetcli = {
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
  const addclient=()=> {
    clientobj.company=company
    clientobj.street=street
    clientobj.zip=zip
    clientobj.city=city
    clientobj.country=country
    console.log(clientobj)
    const returnedclient = Object.assign(targetcli, clientobj);


  }
  const previouspager=()=> {
    //addlook();
    router.push('/mainpage')
  }
  const prodpager=()=> {
    addclient();
    router.push('/products')
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
      <motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: .8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: .4
    }
  },
}}>
  <h5 className={styles.title}>
          Hi, <a>{usern}</a> 👋
        </h5>
</motion.div>
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Enter Client details</p>
      </div>
      
      <form>
    <div class="p-10 grid gap-6 mb-6 lg:grid-cols-2 ">
        
        <div>
            <label for="ccompany" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company</label>
            <input onChange={(e) => setcompany(e.target.value)} type="text" id="ccompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anotherkompany" required/>
        </div>  
        <div>
            <label for="caddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Street</label>
            <input onChange={(e) => setstreet(e.target.value)} type="text" id="caddress" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="21 Jump Street" required/>
        </div>  
        <div>
            <label for="czip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
            <input onChange={(e) => setzip(e.target.value)} type="number" id="czip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" 9990"  required/>
        </div>
        <div>
            <label for="ccity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
            <input onChange={(e) => setcity(e.target.value)} type="text" id="ccity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Oslo" required/>
        </div>  
        <div>
            <label for="ccountry" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country</label>
            <input onChange={(e) => setcountry(e.target.value)} type="text" id="ccountry" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Norway" required/>
        </div>  
      </div>
      </form>
      <div class="px-5">
      <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
      <button onClick={prodpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

      </div>


     <Footer/>
    </div>

  
  );
}
