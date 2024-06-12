import './Stats.css';
import React ,{useState, useEffect} from 'react'
import { Slide } from "react-awesome-reveal";
import { BsCurrencyDollar } from "react-icons/bs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
function Stats(props: any) {
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
          <h2 className='cards-top'>Statistics</h2>
          <div className='balance-div'>
            <p>Current Balance</p>
            <p>${Intl.NumberFormat().format(props.statsBalance)}</p>
          </div>
          <div className='chart-div'>
            <AreaChart className='area'
              width={510}
              height={320}
              data={props.chartData}
              margin={{
                top: 10,
                right:82,
                left: 84,
                bottom: 12}}>
              <XAxis dataKey={`date`} fontSize={12} stroke='white'/>
              <Area type="monotone" dataKey="pv" strokeWidth={7} stroke="rgb(0, 102, 255)" fill="rgba(0, 102, 255, 0.072)" />
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
