import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  user = useSelector(store => store.user);
  const showgptsearch = useSelector(store => store.gpt.showGPTSearch);
  const handleSignOut = () =>{
          signOut(auth).then(() => {
              navigate("/");
            }).catch((error) => {
                navigate("/error");
            });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({
          uid: uid, 
          email:email, 
          displayName: displayName, 
          photoURL: photoURL
        }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });  


    //unsubscsribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = ()=>{
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleLangugageChange = (e)=>{

    dispatch(changeLanguage(e.target.value));
  }


  return (
    <div className= "absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
        <img 
            className="w-44 mx-auto md:mx-0"
            src= {LOGO}
            alt= "logo"
        />
        {user && <div className='justify-between flex p-2'>
            {showgptsearch && <select className="p-2 m-2 bg-gray-800 text-white" onChange={handleLangugageChange}>
              {SUPORTED_LANGUAGES.map(lang => <option key = {lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>}
            <button className= "py-2 px-4 mx-4 my-2 bg-blue-800 rounded-lg text-white" onClick={handleGptSearchClick}>{showgptsearch? "HomePage":"GPT Search"}</button>
            <img
              className='hidden md:inline-block w-12 h-12'
              alt = "usericon"
              src = {user.photoURL}
            />
            <button onClick = {handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header