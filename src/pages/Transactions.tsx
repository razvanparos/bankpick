import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader.tsx";
import TransactionsViewer from "../components/TransactionsViewer.tsx";
import { Slide } from "react-awesome-reveal";

function Transactions() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Transactions History"} />
        <TransactionsViewer />
      </Slide>
    </article>
  );
}

export default Transactions;
