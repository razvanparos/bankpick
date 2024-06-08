import './TopUp.css';
import React ,{useState, useEffect, useContext} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';
import Loader from '../../Components/Loader/Loader';


function TopUp(props: any) {

    const [selectedCard, setSelectedCard] = useState('')
    const [topUpAmount, setTopUpAmount] = useState('')
    const [topUpError, setTopUpError] = useState('')
    const [loading, setLoading] = useState(false)
    const {getUserData} = useContext(UserContext);

    const focusInput = ()=>{
        document.getElementById('amt')?.focus()
    }
    const handleAddMoney = async()=>{
        setLoading(true);
        if(!selectedCard){
            setTopUpError('No Card Selected')
            setLoading(false);
            return
        }else setTopUpError('')
        if(Number(topUpAmount)<10){
            setTopUpError('Minimum $10')
            setLoading(false);
            return
        }else setTopUpError('')
        try {
            const usersRef = doc(db, 'UsersDetails', props.uid);
            const cardIndex = props.myCardsArray.findIndex(card => card.id === selectedCard);
            if (cardIndex === -1) {
                throw new Error("Card not found");
            }
            let orderDate = new Date();
            let orderDateFormat = `${orderDate.getDate()}.${orderDate.getMonth()+1}.${orderDate.getFullYear()}`
            let orderTime = new Date();
            let orderTimeFormat: any;
            if(orderTime.getMinutes()<10){
                orderTimeFormat = orderTime.getHours().toLocaleString()+':0'+orderTime.getMinutes()
            }else{
                orderTimeFormat = orderTime.getHours().toLocaleString()+':'+orderTime.getMinutes()
            }
            var newId = "id" + Math.random().toString(16).slice(2);
            const updatedCardsArray = [...props.myCardsArray];
            const updatedTransactions = [...props.myTransactionsArray,{
                id: newId,
                type:'income',
                amount: Number(topUpAmount),
                cardUsed: selectedCard,
                transactionDate: orderDateFormat,
                transactionTime: orderTimeFormat,
                from: 'TopUp'
            }];
            updatedCardsArray[cardIndex] = {
                ...updatedCardsArray[cardIndex],
                cardName: props.myCardsArray[cardIndex].cardName,
                cardNumber: props.myCardsArray[cardIndex].cardNumber,
                expireMonth: props.myCardsArray[cardIndex].expireMonth,
                expireYear: props.myCardsArray[cardIndex].expireYear,
                cvv: props.myCardsArray[cardIndex].cvv,
                id: props.myCardsArray[cardIndex].id,
                cardBalance: Number(props.myCardsArray[cardIndex].cardBalance) + Number(topUpAmount)
            };
            await updateDoc(usersRef, { myCards: updatedCardsArray});
            await updateDoc(usersRef, { transactions: updatedTransactions});
            await getUserData();
            setTopUpError('')
            setLoading(false)
            props.changeTab('home')
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false)
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
            <button className='primary-btn topup-add' onClick={handleAddMoney}>{loading?<Loader/>:'Add Money'}</button>
        </Slide>
        
    </div>
  );
}

export default TopUp;
