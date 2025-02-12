import React, { useState,useEffect } from "react";
import Card from "./Card.tsx";
import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData } from "../services/usersService.ts";

interface CardsViewerType {
  cardsRendered?: number;
}

function CardsViewer({ cardsRendered }: CardsViewerType) {
  const navigate = useNavigate()
  let [cards, setCards] = useState([]);
  
  const updateCards = async () => {
   let data:any = await getCurrentUserData()
   setCards(data[0].myCards)
  };

  useEffect(() => {
    updateCards();
  }, []);


  return cards.length > 0 ? (
    <article className="flex flex-col gap-y-4">
      <p className="text-sm text-gray">Tap the card to reveal information</p>
      {cards.slice(0, cardsRendered).map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </article>
  ) : (
    <article className="flex flex-col items-center gap-y-4">
        <p>Add new card</p>
        <ButtonComponent text="+" type='round' onClickFunction={()=>{navigate('/add-card')}}/>
    </article>
  );
}

export default CardsViewer;
