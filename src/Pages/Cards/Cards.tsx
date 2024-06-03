import './Cards.css';
import React from 'react'
import { Slide } from "react-awesome-reveal";
import cardImg1 from '../../Assets/Group 1000000882.png'
import cardImg2 from '../../Assets/Group 1000000964.png'
import cardImg3 from '../../Assets/Group 3.png'


function Cards(props: any) {
  const openCard = (card: any)=>{
    props.openIndividualCard(card);
  }
  return (
    <div className="cards-div padding">
        <Slide duration={300}>
          <h2 className='cards-top'>
                All cards
          </h2>
          <div className='my-cards-list'>
            {props?.myCardsArray.map((card: any)=>{
                return(
                  <div key={card.id} className='card' onClick={()=>{openCard(card)}}>
                    <div className='card-top'>
                        <img src={cardImg1} alt="" />
                        <img src={cardImg2} alt="" />
                    </div>
                    <div className='card-number'>
                        <p>{Math.floor(card.cardNumber/1000000000000)}</p>
                        <p>{Math.floor(Math.floor((Math.floor(card.cardNumber%1000000000000)))/100000000)}</p>
                        <p>{Math.floor(Math.floor(card.cardNumber%100000000)/10000)}</p>
                        <p>{card.cardNumber%10000}</p>
                    </div>
                    <h3>{card.cardName}</h3>
                    <div className='card-bottom'>
                        <div>
                            <p className='small-text'>Expiry Date</p>
                            <p>{`${card.expireMonth<10?`0${card.expireMonth}`:`${card.expireMonth}`}/${card.expireYear}`}</p>
                        </div>
                        <div>
                            <p className='small-text'>CVV</p>
                            <p>{card.cvv}</p>
                        </div>
                        <img src={cardImg3} alt="" />
                    </div>
                </div>
                );
            })}
          </div>
          <button className='primary-btn' onClick={()=>{props.changeTab('addCard')}}>Add Card +</button>
        </Slide> 
    </div>
  );
}

export default Cards;
