import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface CardType {
  card: any;
  key?: string;
  isFlippedDefault?:boolean
}

function Card({ card,isFlippedDefault }: CardType) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlippedDefault?isFlippedDefault:isFlipped} flipDirection="horizontal">
      <section
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
        className="w-full max-w-[420px] opacity-100 bg-gray bg-opacity-15 card-bg-img h-[222px] rounded-3xl p-5 flex flex-col justify-between bg-no-repeat bg-center cursor-pointer"
      >
        <div className="flex flex-col gap-y-4 mb-4">
          <div className="flex justify-between">
            <div className="microchip w-[29px] h-[25px]"> &nbsp; </div>
            <div className="contactless w-[16px] h-[21px]"> &nbsp;</div>
          </div>
          <div className="flex justify-between">
            {["****", "****", "****", card.cardNumber.slice(12,16)].map((c, i) => (
              <h2 key={`${c}${i}`} className="text-3xl text-center">
                {c}
              </h2>
            ))}
          </div>
        </div>
        <p className="text-xl">{card.cardName}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-gray">Expiry Date</p>
            <p>{`${card.expireMonth} / ${card.expireYear}`}</p>
          </div>
          <div>
            <p className="text-gray">CVV</p>
            <p>{`***`}</p>
          </div>
          <div className="mastercard w-[80px] h-[65px]"></div>
        </div>
      </section>
      {/* back of the card */}
      <section
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
        className="w-full max-w-[420px] bg-primaryBlue bg-opacity-15 h-[222px] rounded-3xl p-5 flex flex-col justify-between bg-no-repeat bg-center cursor-pointer"
      >
        <div className="flex justify-between">
          {[card.cardNumber.slice(0,4), card.cardNumber.slice(4,8), card.cardNumber.slice(8,12), card.cardNumber.slice(12,16)].map((c, i) => (
            <h2 key={`${c}${i}`} className="text-3xl text-center">
              {c}
            </h2>
          ))}
        </div>
        <p className="text-xl max-w-[400px] overflow-hidden">{card.cardName}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-gray">Expiry Date</p>
            <p className="max-w-[60px] overflow-hidden">{`${card.expireMonth} / ${card.expireYear}`}</p>
          </div>
          <div>
            <p className="text-gray">CVV</p>
            <p className="max-w-[30px] overflow-hidden">{card.cardCvv}</p>
          </div>
          <div className="mastercard w-[80px] h-[65px]"></div>
        </div>
      </section>
    </ReactCardFlip>
  );
}

export default Card;
