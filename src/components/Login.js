import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkvalidatedata } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'
import { BACKGROUNG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {

  const [issigninform, setissigninform] = useState(true);
  const [errormessage, seterrormessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  
  const dispatch = useDispatch();

  const handlebuttonclick = () => {
    const fullnamevalue = fullname.current ? fullname.current.value : '';
    const passwordValue = password.current ? password.current.value : '';
    const emailValue = email.current ? email.current.value : '';
    // validate the form data
    const message = checkvalidatedata(emailValue, passwordValue, fullnamevalue, issigninform);
    
    seterrormessage(message);
    if (message) return;
    // sign In/ Sign Up Logic
    if(!issigninform){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullnamevalue, photoURL: USER_AVATAR
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
    
        }).catch((error) => {
          seterrormessage(error.message);
        });
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrormessage(errorCode + "-" + errorMessage);
      });
    } else{
      //signin logic 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => { 
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + "-" + errorMessage);
        });
      }

  };

  const togglesigninform = ()=> {

    setissigninform(!issigninform);

  }
  return (
    <div>
        <Header />
        <div className="absolute">
            <img 
                className="h-screen object-cover md:w-screen"
                src= {BACKGROUNG_URL}
                alt = "background"
            />
         </div>
         <div>
            <form onSubmit = {(e)=> e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black right-0 left-0 mx-auto my-36 text-white rounded-lg bg-opacity-80" >
                <h1 className="font-bold text-3xl py-4">{issigninform ? "Sign In":"Sign Up"}</h1>
                {!issigninform &&<input ref={fullname} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
                <input ref={email}
                type='text' placeholder='Email or mobile number' className='p-4 my-4 w-full bg-gray-700'/>
                <input ref={password}
                type='Password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
                <p className="text-red-500 font-bold text-lg py-2">{errormessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'onClick={handlebuttonclick}>{issigninform ? "Sign In":"Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={togglesigninform}>{issigninform ?  "New to Netflix? Sign up now.":"Already registered? Sign In now."}</p>
            </form>
         </div>
    </div>
  )
}

export default Login