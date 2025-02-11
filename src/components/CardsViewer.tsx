import React, { useContext } from "react";
import Card from "./Card.tsx";
import { AppContext } from "../context/AppContext.tsx";

interface CardsViewerType{
    cardsRendered?:number
  }

function CardsViewer({cardsRendered}:CardsViewerType) {
  const { state } = useContext(AppContext);
  const { userData } = state;
  return (
    <article className="flex flex-col gap-y-4">
      <p className="text-sm text-gray">Tap the card to reveal information</p>
      {userData[0]?.myCards.slice(0,cardsRendered).map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </article>
  );
}

export default CardsViewer;
