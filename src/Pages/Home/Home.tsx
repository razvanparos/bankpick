import './Home.css';
import React, { useEffect, useState } from 'react'
import { Slide } from "react-awesome-reveal";
import { FaUser } from "react-icons/fa";
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'
import sendIcon from '../../Assets/Sent-Icon.png'
import receiveIcon from '../../Assets/Receive-Icon.png'
import Loan from '../../Assets/Loan-Icon.png'
import TopUp from '../../Assets/Topup.png'
import Add from '../../Assets/Add-Icon.png'

function Home(props: any) {
    const [myCardsArray, setMyCardsArray]=useState<any[]>([]);

    useEffect(()=>{
        setMyCardsArray(props.userData.myCards)
    },[props.userData])

    const signOut = () =>{
        localStorage.setItem('RememberUser','')
        props.changePage('login')
    }
    
     
    return (
    <Slide direction='down' duration={500}>
        <div className="home-div padding">
            <div className='home-top'>
                <div className='profile-pic' onClick={signOut}>
                    <FaUser className='user-icon'/>
                </div>
                <div className='home-top-name'>
                    <p className='small-text'>Welcome back,</p>
                    <h2>{props.userData.fullName}</h2>
                </div>
            </div>
            {myCardsArray?.length>0 ?(
            <div>
                {myCardsArray?.map((card) => (
                        <div key={card.id} className='card'>
                            <div className='card-top'>
                                <img src={cardImg1} alt="" />
                                <img src={cardImg2} alt="" />
                            </div>
                            <div className='card-number'>
                                <p>{Math.floor(card.cardNumber/1000000000000)}</p>
                                <p>{Math.floor(Math.floor((Math.floor(card.cardNumber%1000000000000)))/100000000)}</p>
                                <p>{Math.floor(Math.floor(card.cardNumber%100000000)/10000)}</p>
                                <p>{card.cardNumber%10000}</p>
                            </div>
                            <h3>{card.cardName}</h3>
                            <div className='card-bottom'>
                                <div>
                                    <p className='small-text'>Expiry Date</p>
                                    <p>{`${card.expireMonth<10?`0${card.expireMonth}`:`${card.expireMonth}`}/${card.expireYear}`}</p>
                                </div>
                                <div>
                                    <p className='small-text'>CVV</p>
                                    <p>{card.cvv}</p>
                                </div>
                                <img src={cardImg3} alt="" />
                            </div>
                        </div>
                    ))}
            </div>):(<div className='add-new-card'>
                        <p>Add new card</p>
                        <img src={Add} alt="" />
                    </div>)}
            {myCardsArray?.length>0 ?         
            <div className='card-actions'>
                <img src={sendIcon} alt="" />
                <img src={receiveIcon} alt="" />
                <img src={Loan} alt="" />
                <img src={TopUp} alt="" />
            </div>: ''}
            
            <div className='transactions-div'>
                <div className='transactions-top'>
                    <p>Transactions</p>
                    <p style={{color:'var(--primary-blue)'}}>See All</p>
                </div>
            </div>
        </div>
    </Slide>
);
}

export default Home;
