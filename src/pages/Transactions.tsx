import React,{useContext,useEffect} from 'react';
import PageHeader from '../components/PageHeader.tsx';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import TransactionsViewer from '../components/TransactionsViewer.tsx';
import { AppContext } from '../context/AppContext.tsx';

function Transactions() {
    const {state} = useContext(AppContext)
    const {userData} = state
    const {transactions} = userData[0]

    useEffect(()=>{
        window.scrollTo({ top: 0 });
    },[])

    return ( 
        <article className='flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8'>
            <PageHeader text={'Transactions History'}/>
            <TransactionsViewer transactions={transactions}/>
        </article>
     );
}

export default Transactions;