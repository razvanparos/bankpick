import * as React from "react";
import { VscArrowUp } from "react-icons/vsc";
import { BiDollar } from "react-icons/bi";
import CardActionComponent from "./CardActionComponent.tsx";
import { useNavigate } from "react-router-dom";

function CardActions() {
  const navigate = useNavigate()
  return (
    <article className="flex justify-between py-4">
      <CardActionComponent text={"Send"} icon={<VscArrowUp />} onClickFunction={()=>{navigate('/send')}} />
      <CardActionComponent text={"TopUp"} icon={<BiDollar />} onClickFunction={()=>{navigate('/topup')}}/>
    </article>
  );
}

export default CardActions;
