import React, { useState,useEffect } from "react";
import Card from "./Card.tsx";
import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import { getCurrentUserData } from "../services/usersService.ts";
import AddCardPrompt from "./AddCardPrompt.tsx";


function CardsViewer() {
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
      <p className="text-sm text-gray">Tap the card to update information</p>
      {cards.map((card) => {
        return <Card key={card.id} card={card} redirect={true}/>;
      })}
    </article>
  ) : (
   <AddCardPrompt/>
  );
}

export default CardsViewer;
