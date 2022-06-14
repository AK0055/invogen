import useDarkMode from "../comps/useDarkMode";
import Link from 'next/link'
import { initializeApp } from "firebase/app";
import firebaseConfig from "../comps/firebaseconfig";
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';

import {
  auth,
  db
} from "../comps/firebaser";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
export default function Navbar() {
    const [colorTheme, setTheme] = useDarkMode();
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const logout = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        signOut(auth);
        router.push('/');
      };
     
    return(
        
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            {colorTheme === "light" ? (
             
        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <svg
          onClick={() => setTheme("light")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg></button>
      ) : (
        <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">

        <svg
          onClick={() => setTheme("dark")}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg></button>
        
      )}
            <div class="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/mainpage">
            <a class="flex items-center">
              <motion.img src="/invologo.jpg" class="mr-3 h-6 sm:h-9" alt="InvoLogo" whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{
                  scale: 1.2,
                  rotate: -90,
                  borderRadius: "100%"

              }}/>
          
                  <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invogen</span>
            </a>
            </Link>
            <div class="flex md:order-2">
                <Link href="/">
                <button onClick={logout} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </Link>
                
              
            </div>
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
              <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link href='/mainpage'>
                  <a  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                  </Link>
                </li>
                <li>
                    <Link href='/yourinvoices'>
                  <a  class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your invoices</a>
                      </Link>
                </li>
                
                
              </ul>
            </div>
            </div>
            
          </nav>
          
    );

}