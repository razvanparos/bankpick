import React from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import Balance from "../components/Balance.tsx";
import AreaChartComponent from "../components/AreaChartComponent.tsx";
import TransactionsViewer from "../components/TransactionsViewer.tsx";
function Stats() {
  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300}>
        <PageHeader text={"Statistics"} />
        <Balance text={'Current balance'}/>
        <AreaChartComponent/>
        <TransactionsViewer header={true} transactionsRendered={5}/>
      </Slide>
    </article>
  );
}

export default Stats;
