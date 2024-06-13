import './IndividualCard.css';
import React ,{useState, useEffect, useContext} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'
import {getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';


function IndividualCard(props: any) {
    const [editCardNumber, setEditCardNumber]=useState(props.individualCardData.cardNumber);
    const [editCardName, setEditCardName]=useState(props.individualCardData.cardName);
    const [editCardMonth, setEditCardMonth]=useState(props.individualCardData.expireMonth);
    const [editCardYear, setEditCardYear]=useState(props.individualCardData.expireYear);
    const [editCardCvv, setEditCardCvv]=useState(props.individualCardData.cvv);
    const [editCardError, setEditCardError]=useState('');
    const {getUserData} = useContext(UserContext);

    useEffect(()=>{
        if(Number(editCardMonth)>12){
            setEditCardMonth(String(12))
        }
        if(Number(editCardMonth)<1){
            setEditCardMonth(String(''))
        }
    },[editCardMonth])
    useEffect(()=>{
        if(Number(editCardCvv)>999){
            setEditCardCvv(String(999))
        }
        if(Number(editCardCvv)<0){
            setEditCardCvv(String(0))
        }
    },[editCardCvv])
    useEffect(()=>{
        if(Number(editCardYear)>99){
            setEditCardYear(String(99))
        }
        if(Number(editCardYear)<24 && Number(editCardYear)>10){
            setEditCardYear('')
        }
    },[editCardYear])
    useEffect(()=>{
        if(Number(editCardNumber)>9999999999999999){
            setEditCardNumber(String(''))
        }
    },[editCardNumber])

    const handleUpdateCard=async()=>{
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = Math.floor(currentDate.getFullYear()%100);
        if(!/^[A-Za-z\s]+$/.test(editCardName)){
            setEditCardError('Invalid Cardholder Name')
            return;
        }else{setEditCardError('')}
        if(editCardNumber.toString().length<16){
            setEditCardError('Invalid Card Number')
            return;
        }else{setEditCardError('')}
        if(Number(editCardYear)<24){
            setEditCardError('Invalid Expiry Year')
            return;
        }else{setEditCardError('')}
        if(Number(editCardYear)<=currentYear && Number(editCardMonth)<currentMonth){
            setEditCardError('Expired Card')
            return;
        }else{setEditCardError('')}
        if(editCardCvv.toString().length<3 || editCardCvv.toString().length>3){
            setEditCardError('Invalid Card CVV')
            return;
        }else{setEditCardError('')}
        if(editCardName&&editCardNumber&&editCardMonth&&editCardYear){
            try {
                const usersRef = doc(db, 'UsersDetails', props.uid);
                const cardIndex = props.myCardsArray.findIndex(card => card.id === props.individualCardData.id);
                if (cardIndex === -1) {
                    throw new Error("Card not found");
                }
                const updatedCardsArray = [...props.myCardsArray];
                updatedCardsArray[cardIndex] = {
                    ...updatedCardsArray[cardIndex],
                    cardName: editCardName,
                    cardNumber: editCardNumber,
                    expireMonth: editCardMonth,
                    expireYear: editCardYear,
                    cvv: editCardCvv,
                    cardBalance: props.individualCardData.cardBalance,
                    id:  props.individualCardData.id
                };
                await updateDoc(usersRef, { myCards: updatedCardsArray });
                await getUserData();
                setEditCardError('');
                props.changeTab('cards')
            } catch (error) {
                console.error("Error:", error);
            }
        }else{setEditCardError('Please complete all fields')}
    }

    const handleDeleteCard=async()=>{
        const updatedCardsArray = [...props.myCardsArray];
        const usersRef = doc(db, 'UsersDetails', props.uid);
        const cardIndex = props.myCardsArray.findIndex(card => card.id === props.individualCardData.id);
        if (cardIndex !== -1) {
            updatedCardsArray.splice(cardIndex, 1);
            await updateDoc(usersRef, {myCards: updatedCardsArray });
        } 
        await getUserData();
        props.changeTab('cards')
    }

  return (
    <div className="individual-card-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('cards')}}/>
                <p>Update Card</p>
            </div>
            <div className='card'>
                    <div className='card-top'>
                        <img src={cardImg1} alt="" />
                        <img src={cardImg2} alt="" />
                    </div>
                    <div className='card-number'>
                        <p>{Math.floor(Number(editCardNumber)/1000000000000)}</p>
                        <p>{Math.floor(Math.floor((Math.floor(Number(editCardNumber)%1000000000000)))/100000000)}</p>
                        <p>{Math.floor(Math.floor(Number(editCardNumber)%100000000)/10000)}</p>
                        <p>{Number(editCardNumber)%10000}</p>
                    </div>
                    <h3 className='card-name'>{editCardName}</h3>
                    <div className='card-bottom'>
                        <div>
                            <p className='small-text'>Expiry Date</p>
                            <p>{`${editCardMonth}/${editCardYear}`}</p>
                        </div>
                        <div>
                            <p className='small-text'>CVV</p>
                            <p>{editCardCvv}</p>
                        </div>
                        <img src={cardImg3} alt="" />
                    </div>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Cardholder Name</p>
                    <input type="text" value={editCardName} onChange={(e)=>{setEditCardName(e.target.value)}}/>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Card Number</p>
                    <input type="number" value={editCardNumber} onChange={(e)=>{setEditCardNumber(e.target.value)}}/>
                </div>
                <div className='add-card-bottom'>
                    <div className='input-field'>
                        <p className='small-text'>Expiry Date</p>
                        <div className='date-input-div'>
                            <input type="number" placeholder={'mm'} value={editCardMonth} onChange={(e)=>{setEditCardMonth(e.target.value)}}/>/
                            <input type="number" placeholder={'yy'} value={editCardYear} onChange={(e)=>{setEditCardYear(e.target.value)}}/>
                        </div>
                        
                    </div>
                    <div className='input-field'>
                        <p className='small-text'>CVV</p>
                        <input type="number" value={editCardCvv} onChange={(e)=>{setEditCardCvv(e.target.value)}}/>
                    </div>
                </div>
                <p style={{color:'red', textAlign:'center'}}>{editCardError}</p>
                <button className='add-card-btn primary-btn' onClick={handleUpdateCard}>Update</button>
                <button className='delete-card-btn' onClick={handleDeleteCard}>Delete Card</button>
        </Slide>
        
    </div>
  );
}

export default IndividualCard;
