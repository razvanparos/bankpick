import './Stats.css';
import React ,{useState, useEffect, useContext, useDebugValue, PureComponent} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import {getDocs,getDoc, setDoc,collection, query, where, doc, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import {db} from '../../firebase-config';
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
        </Slide>
    </div>
  );
}

export default Stats;
