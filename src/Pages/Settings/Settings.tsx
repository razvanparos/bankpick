import './Settings.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';
import { BsCurrencyDollar } from "react-icons/bs";
import arrow from '../../Assets/Arrow.png'


function Settings(props: any) {

  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Settings</p>
            </div>
            <p className='small-text'>General</p>
            <div className='settings-list'>
                <div className='option' onClick={()=>{props.changeTab('profile')}}>
                  <p>My Profile</p>
                  <img src={arrow} alt="" />
                </div>
                <div className='option'>
                  <p>Contact Us</p>
                  <img src={arrow} alt="" />
                </div>
            </div>
        </Slide>
    </div>
  );
}

export default Settings;
