import React, { useState, useEffect } from "react";
import { getUserBalance } from "../services/usersService.ts";
import Loader from "./Loader.tsx";
import BalanceLoader from "./BalanceLoader.tsx";

function Balance({ text }) {
  let [balance, setBalance] = useState();

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
      {balance ? (
        <span className="text-3xl max-w-[300px] overflow-hidden">{`$${balance?.toLocaleString()}`}</span>
      ) : (
        <BalanceLoader />
      )}
    </div>
  );
}

export default Balance;
