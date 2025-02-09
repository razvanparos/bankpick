import * as React from "react";
import TransactionRow from "./TransactionRow.tsx";


function TransactionsViewer({ transactions }) {
  return (
    <section className="flex flex-col gap-y-10 bg-darkGray p-4 rounded-xl">
      {transactions.map((t) => {
        return (
          <TransactionRow key={t.id} t={t}/>
        );
      })}
    </section>
  );
}

export default TransactionsViewer;
