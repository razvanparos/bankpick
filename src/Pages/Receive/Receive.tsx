import './Receive.css';
import React ,{useState, useEffect, useContext, useDebugValue} from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
function Receive(props: any) {
  return (
    <div className="topup-div padding">
        <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('home')}}/>
                <p>Receive Money</p>
            </div>
            <p>In development</p>
        </Slide>
    </div>
  );
}
export default Receive;
