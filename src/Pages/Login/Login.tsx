import './Login.css';
import React, { useState } from 'react'
import { Slide } from "react-awesome-reveal";

function Login(props: any) {
    const [signInEmail, setSignInEmail]=useState<string>('')
    const [signInPassword, setSignInPassword]=useState<string>('')
  return (
    <Slide direction='down' duration={500}>
        <div className="login-div padding">
            <h2 className='big-text'>Sign In</h2>
            <div className='border-bottom'>
                <p className='small-text'>Email Address</p>
                <input className='sign-in-input' type="email" value={signInEmail} onChange={(e)=>{setSignInEmail(e.target.value)}}/>
            </div>
            <div className='border-bottom'>
                <p className='small-text'>Password</p>
                <input className='sign-in-input' type="password" value={signInPassword} onChange={(e)=>{setSignInPassword(e.target.value)}}/>
            </div>
            <button className='primary-btn'>Sign In</button>
            <div className='flex small-text new-user'>I'm a new user.<p className='small-text-button' onClick={()=>{props.changePage('register')}}>Sign Up</p></div>
        </div>
    </Slide>
);
}

export default Login;
