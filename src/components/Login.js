import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [issigninform, setissigninform] = useState(true);

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
            <form className="w-3/12 absolute p-12 bg-black right-0 left-0 mx-auto my-36 text-white rounded-lg bg-opacity-80" >
                <h1 className="font-bold text-3xl py-4">{issigninform ? "Sign In":"Sign Up"}</h1>
                {!issigninform &&<input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
                <input type='text' placeholder='Email or mobile number' className='p-4 my-4 w-full bg-gray-700'/>
                <input type='Password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{issigninform ? "Sign In":"Sign Up"}</button>
                <p className="py-4" onClick={togglesigninform}>{issigninform ?  "New to Netflix? Sign up now.":"Already registered? Sign In now."}</p>
            </form>
         </div>
    </div>
    
    
  )
}

export default Login