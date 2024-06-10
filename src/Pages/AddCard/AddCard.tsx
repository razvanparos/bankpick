import './AddCard.css';
import React, { useContext, useEffect, useState } from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'
import {db} from '../../firebase-config';
import {getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import { UserContext } from '../../App';



function AddCard(props: any) {
    const [newCardNumber, setNewCardNumber]=useState('')
    const [newCardName, setNewCardName]=useState('')
    const [newCardMonth, setNewCardMonth]=useState('')
    const [newCardYear, setNewCardYear]=useState('')
    const [newCardCvv, setNewCardCvv]=useState('')
    const [newCardError, setNewCardError]=useState('')
    const {getUserData} = useContext(UserContext);

    useEffect(()=>{
        if(Number(newCardMonth)>12){
            setNewCardMonth(String(12))
        }
        if(Number(newCardMonth)<1){
            setNewCardMonth(String(''))
        }
    },[newCardMonth])
    useEffect(()=>{
        if(Number(newCardCvv)>999){
            setNewCardCvv(String(999))
        }
        if(Number(newCardCvv)<0){
            setNewCardCvv(String(0))
        }
    },[newCardCvv])
    useEffect(()=>{
        if(Number(newCardYear)>99){
            setNewCardYear(String(99))
        }
        if(Number(newCardYear)<24 && Number(newCardYear)>10){
            setNewCardYear('')
        }
    },[newCardYear])
    useEffect(()=>{
        if(Number(newCardNumber)>9999999999999999){
            setNewCardNumber(String(''))
        }
    },[newCardNumber])

    const handleAddCard=async()=>{
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = Math.floor(currentDate.getFullYear()%100);
        if(!/^[A-Za-z\s]+$/.test(newCardName)){
            setNewCardError('Invalid Cardholder Name')
            return;
        }else{setNewCardError('')}
        if(newCardNumber.toString().length<16){
            setNewCardError('Invalid Card Number')
            return;
        }else{setNewCardError('')}
        if(Number(newCardYear)<currentYear){
            setNewCardError('Invalid Expiry Year')
            return;
        }else{setNewCardError('')}
        if(Number(newCardYear)<=currentYear && Number(newCardMonth)<currentMonth){
            setNewCardError('Expired Card')
            return;
        }else{setNewCardError('')}
        if(newCardCvv.toString().length<3 || newCardCvv.toString().length>3 ){
            setNewCardError('Invalid Card CVV')
            return;
        }else{setNewCardError('')}
        if(newCardName&&newCardNumber&&newCardMonth&&newCardYear){
            try {
                var newId = "id" + Math.random().toString(16).slice(2)
                const usersRef = doc(db, 'UsersDetails', props.uid);
                await updateDoc(usersRef,{
                    myCards: arrayUnion({
                        id: newId,
                        cardName: newCardName,
                        cardNumber: newCardNumber,
                        expireMonth: newCardMonth,
                        expireYear: newCardYear,
                        cvv: newCardCvv,
                        cardBalance: 0
                    })
                });
                await getUserData();
                setNewCardError('');
                props.changeTab('cards')
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }else{setNewCardError('Please complete all fields')}
    }

  return (
    <div className="add-card-div padding">
       <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('cards')}}/>
                <p>Add New Card</p>
            </div>
            <div className='card'>
                    <div className='card-top'>
                        <img src={cardImg1} alt="" />
                        <img src={cardImg2} alt="" />
                    </div>
                    <div className='card-number'>
                        <p>{Math.floor(Number(newCardNumber)/1000000000000)}</p>
                        <p>{Math.floor(Math.floor((Math.floor(Number(newCardNumber)%1000000000000)))/100000000)}</p>
                        <p>{Math.floor(Math.floor(Number(newCardNumber)%100000000)/10000)}</p>
                        <p>{Number(newCardNumber)%10000}</p>
                    </div>
                    <h3 className='card-name'>{newCardName}</h3>
                    <div className='card-bottom'>
                        <div>
                            <p className='small-text'>Expiry Date</p>
                            <p>{`${newCardMonth}/${newCardYear}`}</p>
                        </div>
                        <div>
                            <p className='small-text'>CVV</p>
                            <p>{newCardCvv}</p>
                        </div>
                        <img src={cardImg3} alt="" />
                    </div>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Cardholder Name</p>
                    <input type="text" value={newCardName} onChange={(e)=>{setNewCardName(e.target.value)}}/>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Card Number</p>
                    <input type="number" value={newCardNumber} onChange={(e)=>{setNewCardNumber(e.target.value)}}/>
                </div>
                <div className='add-card-bottom'>
                    <div className='input-field'>
                        <p className='small-text'>Expiry Date</p>
                        <div className='date-input-div'>
                            <input type="number" placeholder={'mm'} value={newCardMonth} onChange={(e)=>{setNewCardMonth(e.target.value)}}/>/
                            <input type="number" placeholder={'yy'} value={newCardYear} onChange={(e)=>{setNewCardYear(e.target.value)}}/>
                        </div>
                        
                    </div>
                    <div className='input-field'>
                        <p className='small-text'>CVV</p>
                        <input type="number" value={newCardCvv} onChange={(e)=>{setNewCardCvv(e.target.value)}}/>
                    </div>
                </div>
                <p style={{color:'red', textAlign:'center'}}>{newCardError}</p>
                <button className='add-card-btn primary-btn' onClick={handleAddCard}>Submit</button>
       </Slide>
    </div>
  );
}

export default AddCard;
