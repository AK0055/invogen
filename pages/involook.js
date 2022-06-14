import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import {invotest} from './invotest'
import { motion } from 'framer-motion';
import { storage } from '../comps/firebaser';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useRouter } from 'next/router'
import lookobj from "../comps/looks";
import {
  auth
} from "../comps/firebaser";
export var targetlook = {
    format: '',
    orientation: '',
    
  };
export var url='';

export default function Main() {
    const router= useRouter()
    const [format,setformat]= useState('')
    const [ori, setori] = useState('');
    const [note, setnote] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
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
     
    }
  }
 

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return;
    const storageRef = ref(storage, `${usern}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);url=downloadURL
          
        });
      }
    );
  }
  const addlook=()=> {
    lookobj.format=format
    lookobj.orientation=ori
    lookobj.notice=note
    console.log(lookobj)
    const returnedlook = Object.assign(targetlook, lookobj);


  }
  const finalpager=()=> {
    addlook();
    router.push('/invotest')
  }
  const previouspager=()=> {
    //addlook();
    router.push('/invodetails')
  }
  useEffect(() => {
    const user =  auth.currentUser;
    getemail(user);
  }, []);
  return (
    <div class='bg-white dark:bg-gray-800'>
      <Head>
        <title>Invogen</title>
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
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Edit page preferences</p>
      </div>
      
      <form>
    <div class="p-10 grid gap-6 mb-6 lg:grid-cols-2 ">
        
        <div>
        <label for="format" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Page format</label>
            <select onChange={(e) => setformat(e.target.value)} id="format" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a page format</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="Legal">Legal</option>
            <option value="Letter">Letter</option>
            <option value="Tabloid">Tabloid</option>
            </select>
        </div>
        <div>
        <label for="ori" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Page orientation</label>
            <select onChange={(e) => setori(e.target.value)} id="ori" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose an orientation</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            </select>
        </div>
        <div>
            <label for="note" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bottom notice</label>
            <input onChange={(e) => setnote(e.target.value)} type="text" id="note" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kindly pay before due date" required/>
        </div>  
        <div>
        <label for="img" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Company logo</label>

        <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleSubmit} type='file' />
      {
        !imgUrl &&
          <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progresspercent}%` }}></div>
  </div>
      }
      <div class='p-5'>
          {
            imgUrl &&
            <img src={imgUrl} alt='uploaded file' height={200} />
         }
      </div>

        
        </div>
        
      </div>
      </form>
      <div class="px-5">
      <button onClick={previouspager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
      <button onClick={finalpager} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>

      </div>


     <Footer/>
    </div>

  
  );
}
