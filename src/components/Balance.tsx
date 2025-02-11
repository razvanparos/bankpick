import React, { useState, useEffect } from "react";
import { getTotalBalance } from "../services/usersService.ts";

function Balance({ text }) {
  let [balance, setBalance] = useState(0);
  const updateBalance = async () => {
    const totalBalance = await getTotalBalance();
    setBalance(totalBalance);
  };

  useEffect(() => {
    updateBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <p className="text-sm text-gray">{text}</p>
      <span className="text-3xl">{`$${balance}`}</span>
    </div>
  );
}

export default Balance;
