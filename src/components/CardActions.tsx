import * as React from "react";
import { VscArrowUp } from "react-icons/vsc";
import { BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.tsx";

function CardActions() {
  const navigate = useNavigate();
  return (
    <article className="flex justify-between py-4">
      <ButtonComponent
        text={"Send"}
        type="action"
        onClickFunction={() => {
          navigate("/send");
        }}
      >
        {<VscArrowUp />}
      </ButtonComponent>
      <ButtonComponent
        text={"TopUp"}
        type="action"
        onClickFunction={() => {
          navigate("/topup");
        }}
      >
        {<BiDollar />}
      </ButtonComponent>
    </article>
  );
}

export default CardActions;
