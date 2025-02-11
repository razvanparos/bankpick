import React, { useContext } from "react";
import TransactionRow from "./TransactionRow.tsx";
import { AppContext } from "../context/AppContext.tsx";
import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";

interface TransactionsViewerType {
  transactionsRendered?: number;
  header?: boolean;
}

function TransactionsViewer({
  transactionsRendered,
  header,
}: TransactionsViewerType) {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { userData } = state;
  return (
    <>
      {header ? (
        <section className="flex justify-between items-center">
          <p>Transactions</p>
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
        {userData[0]?.transactions.slice(0, transactionsRendered).map((t) => {
          return <TransactionRow key={t.id} t={t} />;
        })}
      </section>
    </>
  );
}

export default TransactionsViewer;
