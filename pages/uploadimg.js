import { useState } from "react";
import { storage } from '../comps/firebaser';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useRouter } from 'next/router'
export var url='';

export default function App() {
    const router= useRouter()
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
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
          router.push('/invotest')
        });
      }
    );
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }<div>
          {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
      </div>
      
    </div>
  );
}
