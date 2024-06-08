import './Login.css';
import React, { useState } from 'react'
import { Slide } from "react-awesome-reveal";
import {auth} from '../../firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {db} from '../../firebase-config'
import {getDocs, collection, query, where, doc, setDoc} from 'firebase/firestore';
import Loader from '../../Components/Loader/Loader';
import { FaCheck } from "react-icons/fa";


function Login(props: any) {
    const [signInEmail, setSignInEmail]=useState<string>('')
    const [signInPassword, setSignInPassword]=useState<string>('')
    const [loading, setLoading]=useState<boolean>(false)
    const [rememberMe, setRememberMe]=useState<boolean>(false)
    const [errorMsg, setErrorMsg]=useState<string>('')

    const login=async()=>{
        if(signInEmail && signInPassword){
            try{
              setLoading(true);
              await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
              setErrorMsg('')
              const q = query(collection(db,'UsersDetails'), where("id", "==", auth.currentUser?.uid));
                      const querySnapshot = await getDocs(q);
                      const filteredData = querySnapshot.docs.map((doc)=>({
                         ...doc.data(),
                         id: doc.id,
                     })) 
              setLoading(false);
              props.changePage('home')
              props.loginUser(auth.currentUser?.uid, rememberMe,filteredData[0])
            } catch(err){
              setLoading(false);
              setErrorMsg('Invalid Credentials')
              console.error(err)
            }
          }
    }

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
            <div className='remember-me'>
              <div className='remember-box' onClick={()=>{setRememberMe(!rememberMe)}}>{rememberMe?<FaCheck className='fa-check'/>:''}</div>
              <p>Remember me</p>
            </div>
            <p style={{textAlign:'center',color:'red'}}>{errorMsg}</p>
            <button className='primary-btn' onClick={login}>{loading?<Loader/>:'Sign In'}</button>
            <div className='flex small-text new-user'>I'm a new user.<p className='small-text-button' onClick={()=>{props.changePage('register')}}>Sign Up</p></div>
        </div>
    </Slide>
);
}

export default Login;
