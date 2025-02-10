import React, { useContext } from "react";
import PageHeader from "../components/PageHeader.tsx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import CardsViewer from "../components/CardsViewer.tsx";
import { AppContext } from "../context/AppContext.tsx";
import { Slide } from "react-awesome-reveal";
import ButtonComponent from "../components/ButtonComponent.tsx";
function Cards() {
  const { state } = useContext(AppContext);
  const { userData } = state;
  const { myCards } = userData[0];
  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300}>
        <PageHeader text={"Cards"} />
        <CardsViewer cards={myCards} />
        <ButtonComponent text="Add Card +" type='primary' onClickFunction={()=>{}}/>
      </Slide>
    </article>
  );
}

export default Cards;
