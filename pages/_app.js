import '../styles/globals.css'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { motion } from 'framer-motion';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps, router }) {
  return (
    <motion.div key={router.route} initial="initial" animate="animate" exit="exit" variants={{
     
        initial:{ y: 300 },
        animate:{ y: 0},
        exit:{y: -200 },
     
    }}>
      <Component {...pageProps} />
    </motion.div>
  )
  
  
}

export default MyApp
