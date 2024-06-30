import './Register.css';
import React, { useState } from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {db} from '../../firebase-config';
import {auth} from '../../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import Loader from '../../Components/Loader/Loader';


function Register(props: any) {
    const [signUpEmail, setSignUpEmail]=useState<string>('')
    const [signUpPassword, setSignUpPassword]=useState<string>('')
    const [signUpPhone, setSignUpPhone]=useState<string>('')
    const [signUpName, setSignUpName]=useState<string>('')
    const [loading, setLoading]=useState<boolean>(false)
    const [errorMsg, setErrorMsg]=useState<string>('')

    type StatData = {
      date: string;
      pv: number;
  };
    const register = async (e) => {
      e.preventDefault();
      if (signUpName && signUpPhone && signUpEmail && signUpPassword) {
          try {
              setLoading(true);
              let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              let updateDate = new Date();
              if(signUpPhone.length!=10){
                setErrorMsg('Invalid phone')
                setLoading(false);
                return
              }
  
              const statsData: StatData[] = [];
              for (let i = 6; i >= 0; i--) {
                  let date = new Date();
                  date.setDate(updateDate.getDate() - i);
                  let updateDateDay = date.getDate();
                  let updateDateMonth = date.getMonth();
                  let updateDateYear = date.getFullYear();
                  statsData.push({
                      date: `${updateDateDay} ${months[updateDateMonth]}`,
                      pv: 0
                  });
              }
  
              await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
              await setDoc(doc(db, "UsersDetails", `${auth.currentUser?.uid}`), {
                  id: auth.currentUser?.uid,
                  email: signUpEmail,
                  phone: signUpPhone,
                  fullName: signUpName,
                  myCards: [],
                  transactions: [],
                  lastUpdated: [updateDate.getMonth() + 1, updateDate.getDate(), updateDate.getFullYear()],
                  statsData: statsData
              });
  
              setLoading(false);
              props.changePage('login');
          } catch (err) {
              setLoading(false);
              console.log(err);
              setErrorMsg(err.message);
          }
      }else{
        setErrorMsg("All field are required");
      }
  };
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
            <p style={{textAlign:'center', color:'red'}}>{errorMsg}</p>
            <button className='primary-btn' onClick={register}>{loading?<Loader/>:'Sign Up'}</button> 
        </div>
    </Slide>
        
    
  );
}

export default Register;
