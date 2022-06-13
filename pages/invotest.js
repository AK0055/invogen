import easyinvoice from "easyinvoice";
import {targetcli} from "./main2page";
import {targetsen} from "./mainpage";
import {tarprodcopy} from "./products";
import {targetinv} from "./invodetails";
import { useRouter } from 'next/router'
import { storage } from '../comps/firebaser';

import Link from 'next/link'
import {url} from './involook'
import {targetlook} from './involook'
import { ref, getDownloadURL, uploadBytesResumable,uploadString } from "firebase/storage";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react';
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion';
import {
    auth
  } from "../comps/firebaser";
  export var pdfurl='';

export default function invotest(){
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [clicked, setclicked]=useState(false);
    const [usern,setUsern]=useState('User')
    useEffect(() => {
        const user =  auth.currentUser;
        getemail(user);
      }, []);
    console.log(targetcli)
   console.log(targetsen)
   console.log(tarprodcopy)
   console.log(targetinv)
   console.log(targetlook)
    console.log(url)
   var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": url,
        // The invoice background
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data
    "sender": {
        "company": targetsen.company,
        "address": targetsen.street,
        "zip": targetsen.zip,
        "city": targetsen.city,
        "country": targetsen.country

    },
    // Your recipient
    "client": {
        "company": targetcli.company,
        "address": targetcli.street,
        "zip": targetcli.zip,
        "city": targetcli.city,
        "country": targetcli.country
    },
    "information": {
        // Invoice number
        "number": targetinv.invonum,
        // Invoice date
        "date": targetinv.invodate,
        // Invoice due date
        "due-date": targetinv.due
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": tarprodcopy,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": targetlook.notice,
    // Settings to customize your invoice
    "settings": {
        "currency": targetinv.curr, // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
         "tax-notation": targetinv.tax.toLowerCase, // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
         "format": targetlook.format, // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
         "orientation": targetlook.orientation, // portrait or landscape, defaults to portrait
    },
    
};
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
const runez=()=>{
    easyinvoice.createInvoice(data, function (result) {
        try{
        //The response will contain a base64 encoded PDF file
        console.log('downloading');
        //easyinvoice.download('myInvoice.pdf', result.pdf);
        const file=result.pdf
        const storageRef = ref(storage, `${usern}/invoice`);
        var dataurl = 'data:application/pdf;base64,'+file
        
        uploadString(storageRef, dataurl, 'data_url').then((snapshot) => {
            console.log('Uploaded a data url');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL);pdfurl=downloadURL
                console.log(pdfurl)
          });
        
        
        });
        
    }
        catch(err) {console.log(err)}
    
    });
}
    

 

return(
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
      <p className='p-5 text-slate-900 dark:text-white	decoration-8	font-bold'> Your invoice is ready!</p>
    </div>
    
    
    <div class="px-5">
    { imgUrl &&
    <div class="p-5">
        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <a  href={imgUrl} target="_blank" class="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 md:dark:hover:text-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
        </button>

    
    </div>
     }
     {!imgUrl &&    <div>
        <button onClick={runez} type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link-2"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
<button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
    <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Click the link to view Invoice
</button>
     </div> }
    </div>


   <Footer/>
  </div>


);
}