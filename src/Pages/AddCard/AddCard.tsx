import './AddCard.css';
import React, { useState } from 'react'
import { Slide } from "react-awesome-reveal";
import back from '../../Assets/back-img.png';
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'


function AddCard(props: any) {
    const [newCardNumber, setNewCardNumber]=useState('')
    const [newCardName, setNewCardName]=useState('')
    const [newCardMonth, setNewCardMonth]=useState(0)
    const [newCardYear, setNewCardYear]=useState(0)
    const [newCardCvv, setNewCardCvv]=useState(0)
  return (
    <div className="add-card-div padding">
       <Slide duration={300}>
            <div className='back-div'>
                <img src={back} alt="" onClick={()=>{props.changeTab('cards')}}/>
                <p>Add New Card</p>
            </div>
            <div className='card'>
                    <div className='card-top'>
                        <img src={cardImg1} alt="" />
                        <img src={cardImg2} alt="" />
                    </div>
                    <div className='card-number'>
                        <p>{Math.floor(Number(newCardNumber)/1000000000000)}</p>
                        <p>{Math.floor(Math.floor((Math.floor(Number(newCardNumber)%1000000000000)))/100000000)}</p>
                        <p>{Math.floor(Math.floor(Number(newCardNumber)%100000000)/10000)}</p>
                        <p>{Number(newCardNumber)%10000}</p>
                    </div>
                    <h3>{newCardName}</h3>
                    <div className='card-bottom'>
                        <div>
                            <p className='small-text'>Expiry Date</p>
                            <p>{`${newCardMonth<10?`0${newCardMonth}`:`${newCardMonth}`}/${newCardYear}`}</p>
                        </div>
                        <div>
                            <p className='small-text'>CVV</p>
                            <p>{newCardCvv}</p>
                        </div>
                        <img src={cardImg3} alt="" />
                    </div>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Cardholder Name</p>
                    <input type="text" value={newCardName} onChange={(e)=>{setNewCardName(e.target.value)}}/>
                </div>
                <div className='input-field'>
                    <p className='small-text'>Card Number</p>
                    <input type="number" value={newCardNumber} onChange={(e)=>{setNewCardNumber(e.target.value)}}/>
                </div>
                <div className='add-card-bottom'>
                    <div className='input-field'>
                        <p className='small-text'>Expiry Date</p>
                        <input type="text" />
                    </div>
                    <div className='input-field'>
                        <p className='small-text'>CVV</p>
                        <input type="number" />
                    </div>
                </div>
                <button className='add-card-btn primary-btn '>Submit</button>
       </Slide>
    </div>
  );
}

export default AddCard;
