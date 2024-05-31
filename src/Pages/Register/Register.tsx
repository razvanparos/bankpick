import './Register.css';
import React, { useState } from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png'

function Register(props: any) {
    const [signUpEmail, setSignUpEmail]=useState<string>('')
    const [signUpPassword, setSignUpPassword]=useState<string>('')
    const [signUpPhone, setSignUpPhone]=useState<string>('')
    const [signUpName, setSignUpName]=useState<string>('')
  return (
    <Slide direction='right' duration={500}>
        <div className="register-div padding">
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changePage('login')}}/>
            </div>
            <h2 className='big-text'>Sign Up</h2>
            <div className='border-bottom'>
                <p className='small-text'>Full Name</p>
                <input className='sign-in-input' type="text" value={signUpName} onChange={(e)=>{setSignUpName(e.target.value)}}/>
            </div>
            <div className='border-bottom'>
                <p className='small-text'>Phone Number</p>
                <input className='sign-in-input' type="number" value={signUpPhone} onChange={(e)=>{setSignUpPhone(e.target.value)}} />
            </div>
            <div className='border-bottom'>
                <p className='small-text'>Email Address</p>
                <input className='sign-in-input' type="email" value={signUpEmail} onChange={(e)=>{setSignUpEmail(e.target.value)}}/>
            </div>
            <div className='border-bottom'>
                <p className='small-text'>Password</p>
                <input className='sign-in-input' type="password" value={signUpPassword} onChange={(e)=>{setSignUpPassword(e.target.value)}}/>
            </div>
            <button className='primary-btn'>Sign Up</button>
        </div>
    </Slide>
        
    
  );
}

export default Register;
