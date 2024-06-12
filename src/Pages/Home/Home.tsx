import './Home.css';
import React, { useEffect, useState } from 'react'
import { Slide } from "react-awesome-reveal";
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
import Send from '../Send/Send.tsx';
import Transactions from '../Transactions/Transactions.tsx';
import Receive from '../Receive/Receive.tsx';
import Loan from '../Loan/Loan.tsx';
import Profile from '../Profile/Profile.tsx';
import Settings from '../Settings/Settings.tsx';
import Stats from '../Stats/Stats.tsx';
import Loader from '../../Components/Loader/Loader.jsx';

function Home(props: any) {
    const [myCardsArray, setMyCardsArray]=useState<any[]>([]);
    const [myTransactionsArray, setMyTransactionsArray]=useState<any[]>([]);
    const [myLastTransactionsArray, setMyLastTransactionsArray]=useState<any[]>([]);
    const [homeTab, setHomeTab]=useState('home');
    const [individualCardData, setIndividualCardData]=useState({});
    const [isFlippedArray, setIsFlippedArray] = useState<{ [key: number]: boolean }>({});
    
    const sortTransactionsByDateTime = (transactions: any[]) => {
        return transactions?.sort((a, b) => {
            const [dayA, monthA, yearA] = a.transactionDate.split('.').map(Number);
            const [dayB, monthB, yearB] = b.transactionDate.split('.').map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA, ...a.transactionTime.split(':').map(Number));
            const dateB = new Date(yearB, monthB - 1, dayB, ...b.transactionTime.split(':').map(Number));
            return dateB.getTime() - dateA.getTime();
        });
    };


    useEffect(() => {
        setMyCardsArray(props.userData.myCards);
        const sortedTransactions = sortTransactionsByDateTime(props.userData?.transactions);
        setMyTransactionsArray(sortedTransactions);
        setMyLastTransactionsArray(sortedTransactions?.slice(0,5));
    }, [props.userData]);
    useEffect(() => {
        props.getUserData();
    }, [homeTab]);
    
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
                        <div className='profile-pic' onClick={()=>{changeTab('profile')}}>
                            <FaUser className='user-icon'/>
                        </div>
                        <div className='home-top-name'>
                            <p className='small-text'>Welcome back,</p>
                            <h2>{props.userData.fullName}</h2>
                        </div>
                    </div>
                {myCardsArray?.length>0 ?(
                <div className='home-cards-list'>
                    <p className='small-text'>Tap the card to reveal information</p>
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
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} onClick={()=>{changeTab('send')}}>
                    <div className='action-circle'><LiaArrowUpSolid /></div>
                    <p>Send</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} onClick={()=>{changeTab('receive')}}>
                    <div className='action-circle'><LiaArrowDownSolid /></div>
                    <p>Receive</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} onClick={()=>{changeTab('loan')}}>
                    <div className='action-circle'><PiBank /></div>
                    <p>Loan</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} onClick={()=>{changeTab('topUp')}}>
                    <div className='action-circle'><BsCurrencyDollar/></div>
                    <p>TopUp</p>
                </div>
            </div>: ''}
            {myTransactionsArray?.length>0?
                <div className='transactions-div'>
                    <div className='transactions-top'>
                        <p>Transactions</p>
                        <p style={{color:'var(--primary-blue)'}} onClick={()=>{changeTab('transactions')}}>See All</p>
                    </div>
                    <div className='transactions-list'>
                        {myLastTransactionsArray?.map((t)=>(
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
                </div>:<p style={{textAlign:'center'}}>No transactions</p>}
            </div></Slide>:''}

            {homeTab==='cards'?<Cards myCardsArray={myCardsArray} changeTab={changeTab} openIndividualCard={openIndividualCard}/>:''}
            {homeTab==='addCard'?<AddCard changeTab={changeTab} uid={props.userData.id}/>:''}
            {homeTab==='individualCard'?<IndividualCard changeTab={changeTab} individualCardData={individualCardData} uid={props.userData.id} myCardsArray={myCardsArray}/>:''}
            {homeTab==='topUp'?<TopUp changeTab={changeTab} myCardsArray={myCardsArray} uid={props.userData.id} myTransactionsArray={myTransactionsArray}/>:''}
            {homeTab==='send'?<Send changeTab={changeTab} myCardsArray={myCardsArray} uid={props.userData.id} myTransactionsArray={myTransactionsArray} myName={props.userData.fullName}/>:''}
            {homeTab==='transactions'?<Transactions myTransactionsArray={myTransactionsArray} changeTab={changeTab}/>:''}
            {homeTab==='receive'?<Receive changeTab={changeTab}/>:''}
            {homeTab==='loan'?<Loan changeTab={changeTab}/>:''}
            {homeTab==='profile'?<Profile changeTab={changeTab} changePage={props.changePage} myName={props.userData.fullName} uid={props.userData.id}/>:''}
            {homeTab==='settings'?<Settings changeTab={changeTab}/>:''}
            {homeTab==='stats'?<Stats chartData={props.chartData} statsBalance={props.statsBalance} statsData={props.userData?.statsData} changeTab={changeTab} myCardsArray={myCardsArray} myTransactionsArray={myTransactionsArray} myLastTransactionsArray={myLastTransactionsArray} uid={props.userData.id}/>:''}

            <nav className='nav padding'>
                <div onClick={()=>{setHomeTab('home')}} className={`nav-button ${['home','topUp','send','transactions','loan','receive'].includes(homeTab)?'active-tab':''}`}>
                    <TbHome2 className='icon'/>
                    <p>Home</p>
                </div>
                <div onClick={()=>{setHomeTab('cards')}} className={`nav-button ${['cards','addCard','individualCard'].includes(homeTab)?'active-tab':''}`}>
                    <LuWalletCards className='icon'/>
                    <p>Cards</p>
                </div>
                <div onClick={()=>{setHomeTab('stats')}} className={`nav-button ${homeTab==='stats'?'active-tab':''}`}>
                    <AiOutlinePieChart className='icon'/>
                    <p>Statistics</p>
                </div>
                <div onClick={()=>{setHomeTab('settings')}} className={`nav-button ${['settings','profile'].includes(homeTab)?'active-tab':''}`}>
                    <MdOutlineSettings className='icon'/>
                    <p>Settings</p>
                </div>
            </nav>  
        </div>
    </Slide>
);
}

export default Home;
