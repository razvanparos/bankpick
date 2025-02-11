import React from "react";
import PageHeader from "../components/PageHeader.tsx";
import CardsViewer from "../components/CardsViewer.tsx";
import { Slide } from "react-awesome-reveal";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
function Cards() {
  const navigate = useNavigate()
  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300}>
        <PageHeader text={"Cards"} />
        <CardsViewer />
        <ButtonComponent
          text="Add Card +"
          type="primary"
          onClickFunction={() => {navigate('/add-card')}}
        />
      </Slide>
    </article>
  );
}

export default Cards;
