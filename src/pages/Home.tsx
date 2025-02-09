import React,{useContext} from 'react';
import HomeHeader from '../components/HomeHeader.tsx';
import { AppContext } from '../context/AppContext.tsx';
import Balance from '../components/Balance.tsx';
import CardsViewer from '../components/CardsViewer.tsx';
import CardActions from '../components/CardActions.tsx';
import ButtonComponent from '../components/ButtonComponent.tsx';
import TransactionsViewer from '../components/TransactionsViewer.tsx';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    const {state} = useContext(AppContext)
    const {userData} = state
    const {fullName, myCards, transactions} = userData[0]
    return ( 
        <article className='flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8'>
            <HomeHeader fullName={fullName} />
            <Balance cards={myCards}/>
            <CardsViewer cards={[myCards[0]]}/>
            <CardActions/>
            <section className='flex justify-between items-center'>
                <p>Transactions</p>
                <ButtonComponent text='See All' type='text' onClickFunction={()=>{navigate('/transactions')}}/>
            </section>
            <TransactionsViewer transactions={transactions.reverse().slice(0,5)}/>
        </article>
     );
}

export default Home;



