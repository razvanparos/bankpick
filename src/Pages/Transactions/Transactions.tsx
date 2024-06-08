import './Transactions.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { BsCurrencyDollar } from "react-icons/bs";


function Transactions(props: any) {
    
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Transactions History</p>
            </div>
            <div className='transactions-list'>
                {props.myTransactionsArray?.map((t:any)=>(
                    <div key={t.id} className='transaction-card padding'>
                         <div className='transaction-details'>
                            <div className='transaction-icon'><BsCurrencyDollar/></div>
                                <div >
                                    <p>{t.from}</p>
                                    <p className='small-text'>{t.transactionDate}, {t.transactionTime}</p>
                                </div>
                            </div>
                        {t.type==='income'?<p>+ ${Intl.NumberFormat().format(t.amount)}</p>:<p>- ${Intl.NumberFormat().format(t.amount)}</p>}
                            </div>
                        ))}
                    </div>
        </Slide>
    </div>
  );
}

export default Transactions;
