import React, { useState, useEffect } from "react";

function Balance({ cards }) {
  let [balance, setBalance] = useState(0);
  useEffect(() => {
    const totalBalance = cards?.reduce(
      (sum, card) => sum + card.cardBalance,
      0
    );
    setBalance(totalBalance);
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <p className="text-sm text-gray">Personal USD</p>
      <span className="text-3xl">{`$${balance}`}</span>
    </div>
  );
}

export default Balance;
