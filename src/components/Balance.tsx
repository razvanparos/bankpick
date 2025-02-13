import React, { useState,useEffect } from "react";
import { getUserBalance } from "../services/usersService.ts";

function Balance({ text }) {
  let [balance, setBalance] = useState(0);
  
  const updateBalance = async () => {
    const totalBalance = await getUserBalance();
    setBalance(totalBalance);
  };

  useEffect(() => {
    updateBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <p className="text-sm text-gray">{text}</p>
      <span className="text-3xl max-w-[300px] overflow-hidden">{`$${balance.toLocaleString()}`}</span>
    </div>
  );
}

export default Balance;
