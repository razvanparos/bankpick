import * as React from 'react';
function CardFront({ card, onClickFunction,cardColor="gray" }) {

  return (
    <section
      onClick={onClickFunction}
      className={`w-full max-w-[420px] opacity-100 bg-opacity-25 bg-${cardColor}  card-bg-img h-[222px] rounded-3xl p-5 flex flex-col justify-between bg-no-repeat bg-center cursor-pointer`}
    >
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="flex justify-between">
          <div className="microchip w-[29px] h-[25px]"> &nbsp; </div>
          <div className="contactless w-[16px] h-[21px]"> &nbsp;</div>
        </div>
        <div className="flex justify-between">
          {["****", "****", "****", card?.cardNumber?.slice(12, 16)].map(
            (c, i) => (
              <h2 key={`${c}${i}`} className="text-3xl text-center">
                {c}
              </h2>
            )
          )}
        </div>
      </div>
      <p className="text-xl">{card?.cardName}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-gray">Expiry Date</p>
          <p>{`${card?.expireMonth} / ${card?.expireYear}`}</p>
        </div>
        <div>
          <p className="text-gray">CVV</p>
          <p>{`***`}</p>
        </div>
        <div className="mastercard w-[80px] h-[65px]"></div>
      </div>
    </section>
  );
}

export default CardFront;
