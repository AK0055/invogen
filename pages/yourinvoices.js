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
import {urlarr} from '../comps/urls.js'
import {namearr} from '../comps/names.js'
import {
    
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    TimeStamp,doc, setDoc, serverTimestamp
  } from "firebase/firestore";
import {
  auth,db
} from "../comps/firebaser";
export var targetlook = {
    format: '',
    orientation: '',
    
  };
export var url='';

export default function Main() {
    var count=0;
    const router= useRouter()
    const [format,setformat]= useState('')
    const [ori, setori] = useState('');
    const [note, setnote] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [usern,setUsern]=useState('User')
    const [tap,settap]=useState(false);
    const [localarr,setarr]=useState([])
    const [narr,setnarr]=useState([])
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
  const fireread=async ()=>{
      if (count<1){
        settap(true);
        const querySnapshot = await getDocs(collection(db, auth.currentUser.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().url);
          var temp={invname:doc.data().time, invurl: doc.data().url}
          urlarr.push(temp.invurl)
          namearr.push(temp.invname)
          //console.log(urlarr)
        });
        count++;
        setarr(urlarr)
        setnarr(namearr)
      }
      
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
        <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> All your created invoices!</p>
      </div>
      <div className='p-5'>
       <button onClick={fireread} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get Invoices</button>

      <div class="w-72 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {localarr && localarr.map((item,index) =>
        <li className={styles.list} key={index}><a target="_blank" href={item}class="block w-full px-4 py-2 text-black dark:text-white bg-white border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600"><h3>Invoice-{narr[index]}</h3></a></li>
        )}
        </div>
        </div>
   



     <Footer/>
    </div>

  
  );
}
