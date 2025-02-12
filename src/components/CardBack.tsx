import * as React from "react";
function CardBack({card,onClickFunction}) {
  return (
    <section
      onClick={onClickFunction}
      className="w-full max-w-[420px] bg-primaryBlue bg-opacity-15 h-[222px] rounded-3xl p-5 flex flex-col justify-between bg-no-repeat bg-center cursor-pointer"
    >
      <div className="flex justify-between">
        {[
          card?.cardNumber?.slice(0, 4),
          card?.cardNumber?.slice(4, 8),
          card?.cardNumber?.slice(8, 12),
          card?.cardNumber?.slice(12, 16),
        ].map((c, i) => (
          <h2 key={`${c}${i}`} className="text-3xl text-center">
            {c}
          </h2>
        ))}
      </div>
      <p className="text-xl max-w-[400px] overflow-hidden">{card?.cardName}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-gray">Expiry Date</p>
          <p className="max-w-[60px] overflow-hidden">{`${card?.expireMonth} / ${card?.expireYear}`}</p>
        </div>
        <div>
          <p className="text-gray">CVV</p>
          <p className="max-w-[30px] overflow-hidden">{card?.cardCvv}</p>
        </div>
        <div className="mastercard w-[80px] h-[65px]"></div>
      </div>
    </section>
  );
}

export default CardBack;
