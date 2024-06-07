import './TopUp.css';
import React ,{useState, useEffect, useContext} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';


function TopUp(props: any) {

    const [selectedCard, setSelectedCard] = useState('')
    const [topUpAmount, setTopUpAmount] = useState('')
    const [topUpError, setTopUpError] = useState('')
    const {getUserData} = useContext(UserContext);

    const focusInput = ()=>{
        document.getElementById('amt')?.focus()
    }
    const handleAddMoney = async()=>{
        if(!selectedCard){
            setTopUpError('No Card Selected')
            return
        }else setTopUpError('')
        if(Number(topUpAmount)<10){
            setTopUpError('Minimum $10')
            return
        }else setTopUpError('')
        try {
            const usersRef = doc(db, 'UsersDetails', props.uid);
            const cardIndex = props.myCardsArray.findIndex(card => card.id === selectedCard);
            if (cardIndex === -1) {
                throw new Error("Card not found");
            }
            const updatedCardsArray = [...props.myCardsArray];
            updatedCardsArray[cardIndex] = {
                ...updatedCardsArray[cardIndex],
                cardName: props.myCardsArray[cardIndex].cardName,
                cardNumber: props.myCardsArray[cardIndex].cardNumber,
                expireMonth: props.myCardsArray[cardIndex].expireMonth,
                expireYear: props.myCardsArray[cardIndex].expireYear,
                cvv: props.myCardsArray[cardIndex].cvv,
                transactions: [...props.myCardsArray[cardIndex].transactions, {
                    type: 'received',
                    amount: Number(topUpAmount)  
                }],
                cardBalance: Number(props.myCardsArray[cardIndex].cardBalance) + Number(topUpAmount)
            };
            await updateDoc(usersRef, { myCards: updatedCardsArray });
            await getUserData();
            setTopUpError('')
            props.changeTab('home')
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    useEffect(()=>{
        if(Number(topUpAmount)>999999999){
            setTopUpAmount(String(999999999))
        }
        if(Number(topUpAmount)<0){
            setTopUpAmount(String(0))
        }
    },[topUpAmount])

  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Top Up</p>
            </div>
            <div className='topup-cards-list'>
            <p className='small-text'>Select Card</p>
            {props?.myCardsArray?.map((card: any)=>{
                return(
                  <div key={card.id} className={`topup-card padding ${selectedCard===card.id?'selected-card':''}`} onClick={()=>{setSelectedCard(card.id)}}>
                        <h3>{card.cardName}</h3>
                        <div className='topup-card-number'>
                            <p>****</p>
                            <p>{card.cardNumber%10000}</p>
                        </div>
                    </div>
                );
            })}
            </div>
            <div className='topup-amount-div padding input-field' onClick={focusInput}>
                <p className='small-text'>Enter Your Amount</p>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <p style={{fontSize:'24px', fontWeight:'600'}}>USD</p>
                    <input type="number" name="" id="amt" value={topUpAmount} onChange={(e)=>{setTopUpAmount(e.target.value)}}/>
                    <p className='topup-amt'>{Intl.NumberFormat().format(Number(topUpAmount))}</p>    
                </div>
                
            </div>
            <p style={{color:'red', textAlign:'center'}}>{topUpError}</p>
            <button className='primary-btn topup-add' onClick={handleAddMoney}>Add Money</button>
        </Slide>
        
    </div>
  );
}

export default TopUp;
