import './Send.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
import { UserContext } from '../../App';
import Loader from '../../Components/Loader/Loader';

function Send(props: any) {

    const [selectedCard, setSelectedCard] = useState('')
    const [sendAmount, setSendAmount] = useState('')
    const [sendId, setSendEmail] = useState('')
    const [sendCard, setSendCard] = useState('')
    const [sendError, setSendError] = useState('')
    const [loading, setLoading] = useState(false)
    const {getUserData} = useContext(UserContext);

    const focusInput = ()=>{
        document.getElementById('send-amt')?.focus()
    }
    useEffect(()=>{
        if(Number(sendAmount)>999999999){
            setSendAmount(String(999999999))
        }
        if(Number(sendAmount)<0){
            setSendAmount(String(0))
        }
    },[sendAmount])
    const sendMoney = async()=>{
        setLoading(true)
        if(!selectedCard){
            setSendError('No Card Selected')
            setLoading(false)
            return
        }else setSendError('')
        if(!sendId){
            setSendError('Invalid User Id')
            setLoading(false)
            return
        }else setSendError('')
        if(Number(sendAmount)<1){
            setSendError('Minimum $1')
            setLoading(false)
            return
        }else setSendError('')

        const cardIndex = props.myCardsArray.findIndex(card => card.id === selectedCard);
        if(Number(props.myCardsArray[cardIndex].cardBalance)<Number(sendAmount)){
            setSendError('Insufficient Funds')
            setLoading(false)
            return
        }else setSendError('')
        if(sendId===props.uid){
            setSendError('Cannot transfer to same account')
            setLoading(false)
            return
        }else setSendError('')  
        const q = query(collection(db, 'UsersDetails'), where("id", "==", sendId));
            const querySnapshot = await getDocs(q);
            const filteredData = querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }))
            if(filteredData.length<1){
                setSendError('User not found')
                setLoading(false)
                return
            }else{
                setSendError('')
            }
            const sendRef = doc(db, 'UsersDetails', sendId);
            const myRef = doc(db, 'UsersDetails', props.uid);
            const sendDoc = await getDoc(sendRef);
            const cards = sendDoc.data();
            const cardsArray = cards?.myCards
            const transactionsArray = cards?.transactions
            const toName = cards?.fullName
            const sendCardIndex = cardsArray.findIndex(card => card.cardNumber === sendCard);
            if(sendCardIndex<0){
                setSendError('Card not found')
                setLoading(false)
                return
            }else setSendError('')
            const updatedCardsArray = [...cardsArray];
            const updatedMyCardsArray = [...props.myCardsArray];
            var newId = "id" + Math.random().toString(16).slice(2);
            let orderDate = new Date();
            let orderDateFormat = `${orderDate.getDate()}.${orderDate.getMonth()+1}.${orderDate.getFullYear()}`
            let orderTime = new Date();
            let orderTimeFormat: any;
            if(orderTime.getMinutes()<10){
                orderTimeFormat = orderTime.getHours().toLocaleString()+':0'+orderTime.getMinutes()
            }else{
                orderTimeFormat = orderTime.getHours().toLocaleString()+':'+orderTime.getMinutes()
            }
            updatedCardsArray[sendCardIndex] = {
                ...updatedCardsArray[sendCardIndex],
                cardName: cardsArray[sendCardIndex].cardName,
                cardNumber: cardsArray[sendCardIndex].cardNumber,
                expireMonth: cardsArray[sendCardIndex].expireMonth,
                expireYear: cardsArray[sendCardIndex].expireYear,
                cvv: cardsArray[sendCardIndex].cvv,
                id: cardsArray[sendCardIndex].id,
                cardBalance: Number(cardsArray[sendCardIndex].cardBalance) + Number(sendAmount)
            };
            updatedMyCardsArray[cardIndex] = {
                ...updatedCardsArray[cardIndex],
                cardName: props.myCardsArray[cardIndex].cardName,
                cardNumber: props.myCardsArray[cardIndex].cardNumber,
                expireMonth: props.myCardsArray[cardIndex].expireMonth,
                expireYear: props.myCardsArray[cardIndex].expireYear,
                cvv: props.myCardsArray[cardIndex].cvv,
                id: props.myCardsArray[cardIndex].id,
                cardBalance: Number(props.myCardsArray[cardIndex].cardBalance) - Number(sendAmount)
            };
            const updatedTransactions = [...transactionsArray,{
                id: newId,
                type:'income',
                amount: Number(sendAmount),
                cardUsed: props.myCardsArray[cardIndex].id,
                transactionDate: orderDateFormat,
                transactionTime: orderTimeFormat,
                from: `From ${props.myName}`
            }];
            const updatedMyTransactions = [...props.myTransactionsArray,{
                id: newId,
                type:'expense',
                amount: Number(sendAmount),
                cardUsed: selectedCard,
                transactionDate: orderDateFormat,
                transactionTime: orderTimeFormat,
                from: `To ${toName}`
            }];
            await updateDoc(sendRef, { myCards: updatedCardsArray });
            await updateDoc(myRef, { myCards: updatedMyCardsArray });
            await updateDoc(sendRef, { transactions: updatedTransactions});
            await updateDoc(myRef, { transactions: updatedMyTransactions});
            await getUserData();
            setSendError('')
            setLoading(false)
            props.changeTab('home')
    }
    
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Send Money</p>
            </div>
            <p className='small-text'>Select Card</p>
            {props?.myCardsArray?.map((card: any)=>{
                return(
                  <div key={card.id} className={`topup-card padding ${selectedCard===card.id?'selected-card':''}`} onClick={()=>{setSelectedCard(card.id)}}>
                        <div>
                            <h3>{card.cardName}</h3>
                            <p>${card.cardBalance}</p>
                        </div>
                        <div className='topup-card-number'>
                            <p>****</p>
                            <p>{card.cardNumber%10000}</p>
                        </div>
                    </div>
                );
            })}
            <div className='send-to-div padding'>
                <p className='small-text'>Send To</p>
                <input type="text" placeholder={`User Id`} value={sendId} onChange={(e)=>{setSendEmail(e.target.value)}}/>
                <input type="text" placeholder={`Card Number`} value={sendCard} onChange={(e)=>{setSendCard(e.target.value)}}/>
            </div>
            <div className='topup-amount-div padding input-field' onClick={focusInput}>
                <p className='small-text'>Enter Your Amount</p>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <p style={{fontSize:'24px', fontWeight:'600'}}>USD</p>
                    <input type="number" name="" id="send-amt" value={sendAmount} onChange={(e)=>{setSendAmount(e.target.value)}}/>
                    <p className='topup-amt'>{Intl.NumberFormat().format(Number(sendAmount))}</p>    
                </div>
                
            </div>
            <p style={{color:'red', textAlign:'center'}}>{sendError}</p>
            <button className='primary-btn topup-add' onClick={sendMoney}>{loading?<Loader/>:'Send Money'}</button>
        </Slide>
        
    </div>
  );
}

export default Send;
