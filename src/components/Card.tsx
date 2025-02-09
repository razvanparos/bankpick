import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface CardType {
  card: any;
  key?: string;
}

function Card({ card }: CardType) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <section
        onClick={() => {
          setIsFlipped(!isFlipped);
        }}
        className="w-full max-w-[420px] bg-gray bg-opacity-15 card-bg-img h-[222px] rounded-3xl p-5 flex flex-col justify-between bg-no-repeat bg-center cursor-pointer"
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
        <p className="text-xl">{card.cardName}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-gray">Expiry Date</p>
            <p>{`${card.expireMonth} / ${card.expireYear}`}</p>
          </div>
          <div>
            <p className="text-gray">CVV</p>
            <p>{card.cvv}</p>
          </div>
          <div className="mastercard w-[80px] h-[65px]"></div>
        </div>
      </section>
    </ReactCardFlip>
  );
}

export default Card;
