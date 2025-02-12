import React,{useState,useEffect} from 'react';
import HomeHeader from '../components/HomeHeader.tsx';
import Balance from '../components/Balance.tsx';
import CardActions from '../components/CardActions.tsx';
import TransactionsViewer from '../components/TransactionsViewer.tsx';
import { Slide } from 'react-awesome-reveal';
import Card from '../components/Card.tsx';
import { getCurrentUserData } from '../services/usersService.ts';
import { DiVim } from 'react-icons/di';
import Loader from '../components/Loader.tsx';

function Home() { 
    let [homeCard, setHomeCard] = useState('');
      
      const getHomeCard = async () => {
        let data: any = await getCurrentUserData();
        let cards = data[0]?.myCards[0]
        setHomeCard(cards);
      };
    
      useEffect(() => {
        getHomeCard();
      }, []);
    
    return (homeCard?<article className='flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden'>
            <Slide duration={300} triggerOnce={true}>
            <HomeHeader  />
            <Balance text='Personal USD'/>
            <Card card={homeCard}/>
            <CardActions/>
            <TransactionsViewer header={true} transactionsRendered={5}/>
            </Slide>
        </article>:<div className='flex w-[460px] justify-center items-center'><Loader/></div>
        
     );
}

export default Home;



