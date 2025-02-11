import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader.tsx";
import TransactionsViewer from "../components/TransactionsViewer.tsx";

function Transactions() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8">
      <PageHeader text={"Transactions History"} />
      <TransactionsViewer />
    </article>
  );
}

export default Transactions;
