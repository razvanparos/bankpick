import React,{useContext} from 'react';
import HomeHeader from '../components/HomeHeader.tsx';
import { AppContext } from '../context/AppContext.tsx';
import Balance from '../components/Balance.tsx';
import CardsViewer from '../components/CardsViewer.tsx';
import CardActions from '../components/CardActions.tsx';
import ButtonComponent from '../components/ButtonComponent.tsx';
import TransactionsViewer from '../components/TransactionsViewer.tsx';
function Home() {
    const {state} = useContext(AppContext)
    const {userData} = state
    const {fullName, myCards, transactions} = userData[0]
    return ( 
        <div className='flex flex-col gap-y-2 p-4 w-full max-w-[420px] mt-8'>
            <HomeHeader fullName={fullName} />
            <Balance cards={myCards}/>
            <CardsViewer cards={[myCards[0]]}/>
            <CardActions/>
            <section className='flex justify-between items-center'>
                <p>Transactions</p>
                <ButtonComponent text='See All' type='text'/>
            </section>
            <TransactionsViewer transactions={transactions.reverse().slice(0,5)}/>
        </div>
     );
}

export default Home;



