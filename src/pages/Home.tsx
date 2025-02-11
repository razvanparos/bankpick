import React from 'react';
import HomeHeader from '../components/HomeHeader.tsx';
import Balance from '../components/Balance.tsx';
import CardsViewer from '../components/CardsViewer.tsx';
import CardActions from '../components/CardActions.tsx';
import TransactionsViewer from '../components/TransactionsViewer.tsx';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-awesome-reveal';

function Home() { 
    const navigate = useNavigate()
    return ( 
        <article className='flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden'>
            <Slide duration={300} triggerOnce={true}>
            <HomeHeader  />
            <Balance text='Personal USD'/>
            <CardsViewer cardsRendered={1}/>
            <CardActions/>
            <TransactionsViewer header={true} transactionsRendered={5}/>
            </Slide>
        </article>
     );
}

export default Home;



