import React, { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow.tsx";
import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData } from "../services/usersService.ts";
import { sortTransactions } from "../common/utils.ts";
import Loader from "./Loader.tsx";
import TransactionLoader from "./TransactionLoader.tsx";

interface TransactionsViewerType {
  transactionsRendered?: number;
  header?: boolean;
}

function TransactionsViewer({
  transactionsRendered,
  header,
}: TransactionsViewerType) {
  const navigate = useNavigate();

  let [transactions, setTransactions] = useState();

  const updateTransactions = async () => {
    let data: any = await getCurrentUserData();
    let sortedTransactions = sortTransactions(data[0].transactions);
    setTransactions(sortedTransactions);
  };

  useEffect(() => {
    updateTransactions()
  }, []);

  return transactions ? (
    transactions?.length > 0 ? (
      <>
        {header ? (
          <section className="flex justify-between items-center pb-4">
            <h2>Transactions</h2>
            <ButtonComponent
              text="See All"
              type="text"
              onClickFunction={() => {
                navigate("/transactions");
              }}
            />
          </section>
        ) : (
          ""
        )}

        <section className="flex flex-col gap-y-10 bg-darkGray p-4 rounded-xl">
          {transactions?.slice(0, transactionsRendered).map((t) => {
            return <TransactionRow key={t.id} t={t} />;
          })}
        </section>
      </>
    ) : (
      <p className="text-lg text-center text-gray py-8">No transactions</p>
    )
  ) : (
   <TransactionLoader/>
  );
}

export default TransactionsViewer;
