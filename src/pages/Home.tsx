import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader.tsx";
import Balance from "../components/Balance.tsx";
import CardActions from "../components/CardActions.tsx";
import TransactionsViewer from "../components/TransactionsViewer.tsx";
import { Slide } from "react-awesome-reveal";
import Card from "../components/Card.tsx";
import { getCurrentUserData } from "../services/usersService.ts";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import AddCardPrompt from "../components/AddCardPrompt.tsx";

function Home() {
  const navigate = useNavigate();
  let [homeCard, setHomeCard] = useState("");

  const getHomeCard = async () => {
    let data: any = await getCurrentUserData();
    let cards = data[0]?.myCards[0];
    setHomeCard(cards);
  };

  useEffect(() => {
    getHomeCard();
  }, []);

  return (
    <article className="flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <HomeHeader />
        <Balance text="Personal USD" />
        {homeCard ? (
          <div>
            <h2 className="text-sm text-gray mb-2">
              Tap the card to reveal information
            </h2>
            <Card card={homeCard} />
          </div>
        ) : (<AddCardPrompt/>)}
        <CardActions />
        <TransactionsViewer header={true} transactionsRendered={5} />
      </Slide>
    </article>
  );
}

export default Home;
