import * as React from "react";
import { VscArrowUp } from "react-icons/vsc";
import { PiBank } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";
import CardActionComponent from "./CardActionComponent.tsx";

function CardActions() {
  return (
    <article className="flex justify-between p-4">
      <CardActionComponent text={"Send"} icon={<VscArrowUp />} />
      <CardActionComponent text={"Receive"} icon={<VscArrowUp className="rotate-180" />}/>
      <CardActionComponent text={"Loan"} icon={<PiBank />} />
      <CardActionComponent text={"TopUp"} icon={<BiDollar />} />
    </article>
  );
}

export default CardActions;
