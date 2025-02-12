import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import CardFront from "./CardFront.tsx";
import CardBack from "./CardBack.tsx";
import { useNavigate } from "react-router-dom";
interface CardType {
  card: any;
  key?: string;
  isFlippedDefault?: boolean;
  redirect?:boolean
}

function Card({ card, isFlippedDefault,redirect }: CardType) {
  const navigate = useNavigate()
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip
      isFlipped={isFlippedDefault ? isFlippedDefault : isFlipped}
      flipDirection="horizontal"
    >
      <CardFront onClickFunction={!redirect?() => {
          setIsFlipped(!isFlipped);
        }:()=>{navigate('/update-card',{state:{card}})}}  card={card} />

      <CardBack
        onClickFunction={() => {
          setIsFlipped(!isFlipped);
        }}
        card={card}
      />
    </ReactCardFlip>
  );
}

export default Card;
