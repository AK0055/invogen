import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
    onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  
} from "firebase/firestore";
import firebaseConfig from "../comps/firebaseconfig";
import { useRouter } from 'next/router'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const anonylogin=async ()=>{
    try{
        await onAuthStateChanged(auth, (user) => {
            const router = useRouter();

            if (user) {
              const uid = user.uid;
              console.log(uid);
              router.push('/mainpage');
            } });
    }
    catch(err){console.error(err);
    alert(err.message);
  }
    
      
}

 
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  anonylogin,
  storage
};