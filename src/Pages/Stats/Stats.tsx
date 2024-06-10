import './Stats.css';
import React ,{useState, useEffect} from 'react'
import { Slide } from "react-awesome-reveal";
import { UserContext } from '../../App';
import { BsCurrencyDollar } from "react-icons/bs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 2000,
  },
  {
    name: 'Page B',
    uv: 2200,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  }
];



function Stats(props: any) {

  const [statsBalance, setStatsBalance] = useState(0);
  useEffect(() => {
    const totalBalance = props.myCardsArray.reduce((acc:any, card:any) => acc + card.cardBalance, 0);
    setStatsBalance(totalBalance); 
  }, [props.myCardsArray]);

  
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
          <h2 className='cards-top'>Statistics</h2>
          <div className='balance-div'>
            <p>Current Balance</p>
            <p>${Intl.NumberFormat().format(statsBalance)}</p>
          </div>
          <div className='chart-div'>
            <AreaChart className='area'
              width={500}
              height={324}
              data={data}
              margin={{
                top: 0,
                right: 10,
                left: 10,
                bottom: 12}}>
              <Area type="monotone" dataKey="uv" strokeWidth={7} stroke="rgb(0, 102, 255)" fill="rgba(0, 102, 255, 0.072)" />
            </AreaChart>
            <p className='small-text'>Last 7 days balance trend</p>
          </div>
          {props.myTransactionsArray?.length>0?
                <div className='transactions-div'>
                    <div className='transactions-top'>
                        <p>Transactions</p>
                        <p style={{color:'var(--primary-blue)'}} onClick={()=>{props.changeTab('transactions')}}>See All</p>
                    </div>
                    <div className='transactions-list'>
                        {props.myLastTransactionsArray?.map((t)=>(
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
        </Slide>
    </div>
  );
}

export default Stats;
