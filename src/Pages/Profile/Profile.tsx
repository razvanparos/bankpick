import './Profile.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';
import { FaUser } from "react-icons/fa";


function Profile(props: any) {

    const signOut = () =>{
        localStorage.setItem('RememberUser','')
        props.changePage('')
    }
    
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('settings')}}/>
                <p>My Profile</p>
            </div>
            <div className='home-top'>
                <div className='profile-pic'>
                    <FaUser className='user-icon'/>
                </div>
                <div className='home-top-name'>
                    <h2>{props.myName}</h2>
                    <p className='small-text'>Your ID: {props.uid}</p>
                </div>
            </div>
            <button className='logout-btn' onClick={signOut}>Switch Account</button>
        </Slide>
    </div>
  );
}

export default Profile;
