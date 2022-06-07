import Head from "next/head";
import Link from 'next/link'
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Main() {
  
  return (
    <div>
      <Head>
        <title>Mainpage</title>
        <meta name="description" content="invogen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
     
     <Footer/>
    </div>

  
  );
}