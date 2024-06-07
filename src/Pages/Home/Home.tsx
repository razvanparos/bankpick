import './Home.css';
import React, { useEffect, useState } from 'react'
import { Slide, Fade } from "react-awesome-reveal";
import { FaUser } from "react-icons/fa";
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'
import { LiaArrowUpSolid } from "react-icons/lia";
import { LiaArrowDownSolid } from "react-icons/lia";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiBank } from "react-icons/pi";
import Add from '../../Assets/Add-Icon.png'
import { TbHome2 } from "react-icons/tb";
import { LuWalletCards } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import Cards from '../Cards/Cards.tsx';
import AddCard from '../AddCard/AddCard.tsx';
import IndividualCard from '../IndividualCard/IndividualCard.tsx';
import ReactCardFlip from 'react-card-flip';
import TopUp from '../TopUp/TopUp.tsx';

function Home(props: any) {
    const [myCardsArray, setMyCardsArray]=useState<any[]>([]);
    const [homeTab, setHomeTab]=useState('home');
    const [individualCardData, setIndividualCardData]=useState({});
    const [isFlippedArray, setIsFlippedArray] = useState<{ [key: number]: boolean }>({});


    useEffect(()=>{
        setMyCardsArray(props.userData.myCards)
    },[props.userData])

    const signOut = () =>{
        localStorage.setItem('RememberUser','')
        props.changePage('login')
    }
    const changeTab = (tab: string) =>{
        setHomeTab(tab)
    }
    const openIndividualCard = (card: any) =>{
        setHomeTab('individualCard');
        setIndividualCardData(card)
    }
    const handleFlip = (id: number) => {
        setIsFlippedArray((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }
    
    return (
    <Slide duration={500}>
        <div className=" home-screen">
            {homeTab==='home'?
            <Slide duration={300}>
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
                <div className='home-cards-list'>
                    {myCardsArray?.map((card) => (
                        <ReactCardFlip isFlipped={!!isFlippedArray[card.id]} flipDirection="horizontal" key={card.id}>
                            <div className='card' onClick={()=> handleFlip(card.id)}>
                                <div className='card-top'>
                                    <img src={cardImg1} alt="" />
                                    <img src={cardImg2} alt="" />
                                </div>
                                <div className='card-number'>
                                    <p>****</p>
                                    <p>****</p>
                                    <p>****</p>
                                    <p>{card.cardNumber%10000}</p>
                                </div>
                                <h3>{card.cardName}</h3>
                                <div className='card-bottom'>
                                    <div>
                                        <p className='small-text'>Expiry Date</p>
                                        <p>{`${card.expireMonth
                                            <10?`0${card.expireMonth}`:`${card.expireMonth}`}/${card.expireYear}`} </p>
                                                </div> <div>
                                                <p className='small-text'>CVV</p>
                                                <p>***</p>
                                    </div>
                                    <img src={cardImg3} alt="" />
                                </div>
                            </div>
                            <div className='card-back' onClick={()=> handleFlip(card.id)}>
                                <div className='card-number'>
                                    <p>{Math.floor(card.cardNumber/1000000000000)}</p>
                                    <p>{Math.floor(Math.floor((Math.floor(card.cardNumber%1000000000000)))/100000000)}
                                    </p>
                                    <p>{Math.floor(Math.floor(card.cardNumber%100000000)/10000)}</p>
                                    <p>{card.cardNumber%10000}</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                                   <h3>{card.cardName}</h3>
                                   <p>${Intl.NumberFormat().format(card.cardBalance)}</p>
                                </div>
                                
                                <div className='card-bottom'>
                                    <div>
                                        <p className='small-text'>Expiry Date</p>
                                        <p>{`${card.expireMonth
                                            <10?`0${card.expireMonth}`:`${card.expireMonth}`}/${card.expireYear}`} </p>
                                                </div> <div>
                                                <p className='small-text'>CVV</p>
                                                <p>{card.cvv}</p>
                                    </div>
                                    <img src={cardImg3} alt="" />
                                </div>
                            </div>
                        </ReactCardFlip>
                    ))}
                </div>):(<div className='add-new-card'>
                            <p>Add new card</p>
                            <img src={Add} alt="" onClick={()=>{changeTab('cards')}}/>
                        </div>)}
            {myCardsArray?.length>0 ?         
            <div className='card-actions'>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className='action-circle'><LiaArrowUpSolid /></div>
                    <p>Send</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className='action-circle'><LiaArrowDownSolid /></div>
                    <p>Receive</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className='action-circle'><PiBank /></div>
                    <p>Loan</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} onClick={()=>{changeTab('topUp')}}>
                    <div className='action-circle'><BsCurrencyDollar/></div>
                    <p>TopUp</p>
                </div>
            </div>: ''}
            {props.userData?.myCards?.transactions?.length>0?
                <div className='transactions-div'>
                    <div className='transactions-top'>
                        <p>Transactions</p>
                        <p style={{color:'var(--primary-blue)'}}>See All</p>
                    </div>
                </div>:<p style={{textAlign:'center'}}>No transactions</p>}
            </div></Slide>:''}

            {homeTab==='cards'?<Cards myCardsArray={myCardsArray} changeTab={changeTab} openIndividualCard={openIndividualCard}/>:''}
            {homeTab==='addCard'?<AddCard changeTab={changeTab} uid={props.userData.id}/>:''}
            {homeTab==='individualCard'?<IndividualCard changeTab={changeTab} individualCardData={individualCardData} uid={props.userData.id} myCardsArray={myCardsArray}/>:''}
            {homeTab==='topUp'?<TopUp changeTab={changeTab} myCardsArray={myCardsArray} uid={props.userData.id}/>:''}

            <nav className='nav padding'>
                <div onClick={()=>{setHomeTab('home')}} className={`nav-button ${['home','topUp'].includes(homeTab)?'active-tab':''}`}>
                    <TbHome2 className='icon'/>
                    <p>Home</p>
                </div>
                <div onClick={()=>{setHomeTab('cards')}} className={`nav-button ${['cards','addCard','individualCard'].includes(homeTab)?'active-tab':''}`}>
                    <LuWalletCards className='icon'/>
                    <p>Cards</p>
                </div>
                <div onClick={()=>{setHomeTab('statistics')}} className={`nav-button ${homeTab==='statistics'?'active-tab':''}`}>
                    <AiOutlinePieChart className='icon'/>
                    <p>Statistics</p>
                </div>
                <div onClick={()=>{setHomeTab('settings')}} className={`nav-button ${homeTab==='settings'?'active-tab':''}`}>
                    <MdOutlineSettings className='icon'/>
                    <p>Settings</p>
                </div>
            </nav>  
        </div>
    </Slide>
);
}

export default Home;
