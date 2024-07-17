import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkvalidatedata } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'

const Login = () => {

  const [issigninform, setissigninform] = useState(true);
  const [errormessage, seterrormessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlebuttonclick = () => {
    const fullnamevalue = fullname.current ? fullname.current.value : '';
    const passwordValue = password.current ? password.current.value : '';
    const emailValue = email.current ? email.current.value : '';
    // validate the form data
    const message = checkvalidatedata(emailValue, passwordValue, fullnamevalue, issigninform);
    //console.log(email.current.value, password.current.value,)
    seterrormessage(message);
    if (message) return;
    // sign In/ Sign Up Logic
    if(!issigninform){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: fullnamevalue, photoURL: "https://avatars.githubusercontent.com/u/24198342?v=4"
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email:email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
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
          console.log(user);
          navigate("/browse");
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
                src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/7e30a1c8-d525-4106-8911-04b8461d6201/US-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_00121511-337d-4096-a35a-410ac453bf78_large.jpg"
                alt = "background"
            />
         </div>
         <div>
            <form onSubmit = {(e)=> e.preventDefault()} className="w-3/12 absolute p-12 bg-black right-0 left-0 mx-auto my-36 text-white rounded-lg bg-opacity-80" >
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