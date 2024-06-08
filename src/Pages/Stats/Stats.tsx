import './Stats.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';
import { BsCurrencyDollar } from "react-icons/bs";


function Stats(props: any) {
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Statistics</p>
            </div>
        </Slide>
    </div>
  );
}

export default Stats;
