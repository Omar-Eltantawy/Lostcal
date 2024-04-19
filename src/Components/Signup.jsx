import React, { useEffect, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../redux/authSlice'
import { CustomLoader } from '../CustomLoader'
const Signup = () => {
    const token=useSelector((state)=>state.user.token);
    const loading=useSelector((state)=>state.user.loading);
    const dispatch=useDispatch();
    const [username,setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(signupUser({username,email,password}));

        setUsername("");
        setEmail("");
        setPassword("");
    }
    useEffect(()=>{
        if(token){
            navigate("/");
        }
    },[token,navigate]);
  return (
    <div className='sign-up'>
    {
        loading ? <CustomLoader/>:(
            <div className='signup-container'>
                <div className='disc'>
                    <img className='background' src='/src/assets/images/signup.png' alt='background'/>
                    <img className='title' src='/src/assets/images/landing-title.png' alt='title'/>
                    <img className='dots' src='/src/assets/images/paint-splat-paint-splashes-design-use-abstract-vector-illus-illustration(l).png' alt='dots'/>
                    <p>Find The Lost <br/> SAVE<br/> The Day</p>
                    <img className='location' src='/src/assets/images/My_location.png' alt='location'/>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Welcome !</h1>
                    <div className='input-container'>
                        <img src='/src/assets/images/profile 1.png'/>
                        <input type='text' required placeholder='Enter your name' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <div className='input-container'>
                        <img src='/src/assets/images/email.png'/>
                        <input type='email' required placeholder='Enter your email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='input-container'>
                        <img src='/src/assets/images/password.png'/>
                        <input type='password' required placeholder='Enter your password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" />
                    </div>
                    <div className='input-container'>
                        <img src='/src/assets/images/password.png'/>
                        <input type='password' required placeholder='Enter your password' name='confirm password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" />
                    </div>
                    <button type='submit' disabled={loading === true}>Sign Up</button>
                    <Link to="/login" className='have-account'>Already Have Account?</Link>
                </form>
            </div>
        )
    }
        
    </div>
  )
}

export default Signup